import { AbstractTemplateReducer } from './AbstractTemplateReducer'
import { BasicInstallationConfig } from './types'

class TestTemplateReducer extends AbstractTemplateReducer {
    public setConfig = (config: BasicInstallationConfig) => this.config = config
    public getConfigParameters = async () => []
    public getDirectoriesForRemove = async () => []
    public getFilesForRemove = async () => []
    public getDependenciesForRemove = async () => []
    public getFilesContentReplacers = async () => []
}

test('AbstractTemplateReducer::removeImports removes imports ok', async () => {
    const reducer = new TestTemplateReducer()
    ; (reducer as any).removeImports(
        'import { SomeImport, SomeSecondImport } from "./some-import"' +
        'import {FirstTestImport, SecondTestImport, SomeGarbageImport} from "./some-second-import"' +
        'import ThirdTestImport from \'./some-third-import\'' +
        'import { FourthTestImport} from "./some-fourth-test-import"' +
        'import SomeSomeImport from "redux";',

        'FirstTestImport',
        'SecondTestImport',
        'ThirdTestImport',
        'FourthTestImport',
    )
})
