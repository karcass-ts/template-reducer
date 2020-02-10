import { TemplateReducerInterface } from './TemplateReducerInterface'
import { ConfigParametersResult, ReplaceFileContentItem } from './types'
import path from 'path'

export abstract class AbstractTemplateReducer<Config extends Record<string, any>> implements TemplateReducerInterface {
    protected directoryName: string
    protected config: Config = {} as any

    public constructor(
        protected readonly applicationName: string,
        protected readonly directoryPath: string,
    ) {
        this.directoryName = path.basename(directoryPath)
    }

    public getConfig() {
        return this.config
    }

    public setConfig(config: Partial<Config>) {
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

    public async getTestConfigSet(): Promise<Config[]> {
        return []
    }

}
