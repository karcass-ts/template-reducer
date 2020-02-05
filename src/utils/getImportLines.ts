export const getImportLines = (content: string) => {
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