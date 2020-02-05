import { getImportLines } from './getImportLines'

export const removeImports = (content: string, ...importNames: string[]) => {
    type Import = { name: string, index: number, length: number };
    for (const line of getImportLines(content).reverse()) {
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