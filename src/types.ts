export enum ConfigParameterType {
    string = 'string',
    number = 'number',
    radio = 'radio',
    checkbox = 'checkbox',
    confirm = 'confirm',
}

type ConfigNumberParameter = {
    name: string
    description: string
    type: ConfigParameterType.number
    default?: number
}
type ConfigRadioParameter = {
    name: string
    description: string
    type: ConfigParameterType.radio
    choices: { value: string|number, description: string, checked?: boolean }[]
}
type ConfigCheckboxParameter = {
    name: string
    description: string
    type: ConfigParameterType.checkbox
    choices: { value: string|number, description: string, checked?: boolean }[]
}
type ConfigConfirmParameter = {
    name: string
    description: string
    type: ConfigParameterType.confirm
    default?: boolean
}
type ConfigStringParameter = {
    name: string
    description: string
    type: ConfigParameterType.string
    default?: string
}

export type ConfigParameter =
    ConfigNumberParameter|ConfigRadioParameter|ConfigCheckboxParameter|ConfigConfirmParameter|ConfigStringParameter

export type ConfigParametersResult =
    (ConfigParameter | ((config: Record<string, any>) => Promise<ConfigParametersResult|ConfigParameter|undefined>))[]

export type ReplaceFileContentItem = { filename?: string|RegExp, replacer: (content: string, filename: string) => Promise<string> }
