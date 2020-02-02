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

    protected removeImports(content: string, ...imports: string[]) {
        const match = content.match(/import +\{?/)

        return content
    }

    protected removeCodeBlocks(content: string, ...blockBeginSearchText: string[]) {
        return content
    }

}
