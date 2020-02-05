export const replaceBlock = (content: string, blockBeginSearchString: string, replacer: string) => {
    let parensCount = 0
    let bracesCount = 0
    let bracketsCount = 0
    const startIndex = content.indexOf(blockBeginSearchString)
    if (startIndex === -1) {
        return content
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
    return content.slice(0, lineStart) + replacer + content.slice(endIndex)
}