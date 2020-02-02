export type BasicInstallationConfig = {
    name: string
    tabSize: number
    semicolon: boolean
    doubleQuotemark: boolean
}

type ConfigNumberParameter = {
    name: string
    description: string
    type: 'number'
    default?: number
}
type ConfigRadioParameter = {
    name: string
    description: string
    type: 'radio'
    choices: { value: string|number, description: string, checked?: boolean }[]
}
type ConfigCheckboxParameter = {
    name: string
    description: string
    type: 'checkbox'
    choices: { value: string|number, description: string, checked?: boolean }[]
}
type ConfigConfirmParameter = {
    name: string
    description: string
    type: 'confirm'
    default?: boolean
}
type ConfigStringParameter = {
    name: string
    description: string
    type: 'string'
    default?: string
}

export type ConfigParameter =
    ConfigNumberParameter|ConfigRadioParameter|ConfigCheckboxParameter|ConfigConfirmParameter|ConfigStringParameter

export type ConfigParametersResult = (ConfigParameter|((config: BasicInstallationConfig) => Promise<ConfigParameter|undefined>))[]

export type ReplaceFileContentItem = { filename: string, replacer: (content: string) => Promise<string> }
