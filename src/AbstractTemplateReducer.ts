import { TemplateReducerInterface } from './TemplateReducerInterface'
import { ConfigParametersResult, ReplaceFileContentItem } from './types'

export abstract class AbstractTemplateReducer implements TemplateReducerInterface {
    protected config: Record<string, any> = {}

    public getConfig() {
        return this.config
    }

    public setConfig(config: Record<string, any>) {
        this.config = {
            ...this.config,
            ...config,
        }
    }

    public async getConfigParameters(): Promise<ConfigParametersResult> {
        return []
    }

    public async getDirectoriesForRemove(): Promise<string[]> {
        return []
    }

    public async getFilesForRemove(): Promise<string[]> {
        return []
    }

    public async getDependenciesForRemove(): Promise<string[]> {
        return []
    }

    public async getFilesContentReplacers(): Promise<ReplaceFileContentItem[]> {
        return []
    }

    public async finish(): Promise<void> {
        return undefined
    }

}
