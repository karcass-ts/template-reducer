import { replaceBlock } from './replaceBlock'

export const removeCodeBlocks = (content: string, ...blockBeginSearchText: string[]) => {
    for (const searchText of blockBeginSearchText) {
        content = replaceBlock(content, searchText, '')
    }
    return content
}