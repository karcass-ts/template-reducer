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

test('AbstractTemplateReducer::removeImports removes imports ok', () => {
    const reducer = new TestTemplateReducer()
    const content = (reducer as any).removeImports(
        [
            'import { SomeImport, FirstTestImport as SomeSecondImport } from "./some-import"',
            'import TestDefaultImport, {FirstTestImport, SecondTestImportTail, SecondTestImport,',
            '    SGarbgImprt,ThirdTestImport} from \'./some-second-import\'',
            'import ThirdTestImport from \'./some-third-import\'',
            'import JustImportOK , { FirstTestImport, SomeUIglyyyy  as   ',
            'FourthTestImport} from "./some-fourth-test-import"',
            'import FirstTestImport, { SecondTestImport as SecondTestImport, JustAnotherImport} from "one-two";',
            'import SomeSomeImport from "redux";',
            'const constantVal = Math.round(10.2)', '',
            'console.log(constantVal)  ;',
        ].join('\n'),

        'FirstTestImport',
        'SecondTestImport',
        'ThirdTestImport',
        'FourthTestImport',
        'TestDefaultImport',
    )
    expect(content).toEqual([
        'import { SomeImport, FirstTestImport as SomeSecondImport } from "./some-import"',
        'import {SecondTestImportTail, SGarbgImprt} from \'./some-second-import\'',
        'import JustImportOK from "./some-fourth-test-import"',
        'import { JustAnotherImport} from "one-two";',
        'import SomeSomeImport from "redux";',
        'const constantVal = Math.round(10.2)', '',
        'console.log(constantVal)  ;',
    ].join('\n'))
})
test('AbstractTemplateReducer::removeCodeBlocks', () => {
    const reducer = new TestTemplateReducer()
    const content = (reducer as any).removeCodeBlocks(`
        export class Application {
            private container = new Container();
            private console = new Cli();
            private controllers: object[] = [];
            private http!: Express;
        
            public constructor(public readonly config: IConfig) { }
        
            public async run() {
                await this.initializeServices();
        
                if (process.argv[2]) {
                    this.initializeCommands();
                    await this.console.run();
                } else {
                    this.runWebServer();
                }
            }

            public logs = [
                new Cli(), { name: undefine }
            ]

            public logsAnother = []

        }
    `, 'console = new Cli();', 'public async run()', 'public logs')
    expect(content).toEqual(`
        export class Application {
            private container = new Container();
            private controllers: object[] = [];
            private http!: Express;
        
            public constructor(public readonly config: IConfig) { }
        


            public logsAnother = []

        }
    `)
})
