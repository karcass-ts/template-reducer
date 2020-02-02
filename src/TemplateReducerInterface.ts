import { ConfigParametersResult, BasicInstallationConfig, ReplaceFileContentItem } from './types'

export interface TemplateReducerInterface {
    getConfigParameters(): Promise<ConfigParametersResult>
    setConfig(config: BasicInstallationConfig): unknown
    getDirectoriesForRemove(): Promise<string[]>
    getFilesForRemove(): Promise<string[]>
    getDependenciesForRemove(): Promise<string[]>
    getFilesContentReplacers(): Promise<ReplaceFileContentItem[]>
}