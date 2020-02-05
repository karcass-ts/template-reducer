import { ConfigParametersResult, ReplaceFileContentItem } from './types'

export interface TemplateReducerInterface {
    getConfigParameters(): Promise<ConfigParametersResult>
    getConfig(): Record<string, any>
    setConfig(config: Record<string, any>): void
    getDirectoriesForRemove(): Promise<string[]>
    getFilesForRemove(): Promise<string[]>
    getDependenciesForRemove(): Promise<string[]>
    getFilesContentReplacers(): Promise<ReplaceFileContentItem[]>
    finish(): Promise<void>
}