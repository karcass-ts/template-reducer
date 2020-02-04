import { TemplateReducerInterface } from './TemplateReducerInterface'
import { BasicInstallationConfig, ConfigParametersResult, ReplaceFileContentItem } from './types'

export abstract class AbstractTemplateReducer implements TemplateReducerInterface {
    protected config!: BasicInstallationConfig

    public setConfig(config: BasicInstallationConfig) {
        this.config = config
    }

    public abstract getConfigParameters(): Promise<ConfigParametersResult>

    public abstract getDirectoriesForRemove(): Promise<string[]>

    public abstract getFilesForRemove(): Promise<string[]>

    public abstract getDependenciesForRemove(): Promise<string[]>

    public abstract getFilesContentReplacers(): Promise<ReplaceFileContentItem[]>

    protected removeImports(content: string, ...importNames: string[]) {
        type Import = { name: string, index: number, length: number };
        for (const line of this.getImportLines(content).reverse()) {
            const intersections: { name: string, import: Import, index: number }[] = []
            for (const importName of importNames) {
                const imprt = line.imports.find(i => i.name === importName)
                if (imprt) {
                    intersections.push({ name: importName, import: imprt, index: line.imports.indexOf(imprt) })
                }
            }
            for (const intersection of intersections.sort((a, b) => b.index - a.index)) {
                line.string = line.string.slice(0, intersection.import.index) +
                    line.string.slice(intersection.import.index + intersection.import.length)
                line.imports.splice(intersection.index, 1)
            }
            if (intersections.length) {
                if (line.imports.length === 0) {
                    content = content.slice(0, line.index) + content.slice(line.index + line.length)
                } else {
                    const string = line.string
                        .replace(/\s{2,}/gs, ' ')
                        .replace(' , {', ' {') //        converts "import , {" to "import {"
                        .replace(/,[\s,]*,+/gs, ',') //  converts ", , ," to ","
                        .replace('{ ,', '{ ') //         removes comma in "{ ,"
                        .replace(/{,\s?/gs, '{') //      removes comma in "{,"
                        .replace(', }', ' }') //         removes comma in ", }"
                        .replace(/\s?,}/gs, '}') //      removes comma in ",}"
                        .replace(/{\s*}/gs, '') //       removed empty braces
                        .replace(/\s{2,}/gs, ' ') //     doing again for remove spaces artefacts after cleaning
                    content = content.slice(0, line.index) + string + content.slice(line.index + line.length)
                }
            }
        }
        return content
    }

    protected removeCodeBlocks(content: string, ...blockBeginSearchText: string[]) {
        for (const searchText of blockBeginSearchText) {
            let parensCount = 0
            let bracesCount = 0
            let bracketsCount = 0
            const startIndex = content.indexOf(searchText)
            if (startIndex === -1) {
                continue
            }
            let endIndex: number|undefined = undefined
            for (let n = startIndex; n < content.length; n++) {
                endIndex = n
                const char = content[n]
                if (char === '(') {
                    parensCount++
                } else if (char === ')') {
                    parensCount--
                } else if (char === '{') {
                    bracesCount++
                } else if (char === '}') {
                    bracesCount--
                } else if (char === '[') {
                    bracketsCount++
                } else if (char === ']') {
                    bracketsCount--
                } else if (char === '\n') {
                    if (!(parensCount || bracesCount || bracketsCount)) {
                        break
                    }
                }
            }
            const lineStart = content.lastIndexOf('\n', startIndex)
            content = content.slice(0, lineStart) + content.slice(endIndex)
        }
        return content
    }

    protected getImportLines(content: string) {
        type Import = { name: string, index: number, length: number }
        const lines: { index: number, length: number, imports: Import[], string: string }[] = []
        const regex = /^\s*import\s(.*?)\sfrom.*?\n/gms
        let match = regex.exec(content)
        while (match) {
            const rawNames = match[1].split(',')
            const importEntries: Import[] = []
            let index = match[0].indexOf(match[1])
            for (const rawNameIndex in rawNames) {
                const rawName = rawNames[rawNameIndex]
                const nameRegex = /[A-z0-9_]+/g
                const matches: { index: number, string: string }[] = []
                let match = nameRegex.exec(rawName)
                while (match) {
                    matches.push({ index: index + (match.index ?? 0), string: match[0] })
                    match = nameRegex.exec(rawName)
                }
                if (matches.length === 1) {
                    importEntries.push({ name: matches[0].string, index: matches[0].index, length: matches[0].string.length })
                } else if (matches.length === 3 && matches[1].string === 'as') {
                    importEntries.push({
                        name: matches[2].string,
                        index: matches[0].index,
                        length: matches[2].index - matches[0].index + matches[2].string.length,
                    })
                }
                index += rawName.length + 1 // Do not forget length of "," character :-)
            }
            lines.push({
                index: match.index, length: match[0].length, imports: importEntries, string: match[0],
            })
            match = regex.exec(content)
        }
        return lines
    }

}
