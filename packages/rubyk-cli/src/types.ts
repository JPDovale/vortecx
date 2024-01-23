

// export types

export type TypeConfig = {
  name: string
  pattern?: string
  export?: boolean
  receive?: GenericTypeConfig[] | string[]
}

export type InterfaceConfig = {
  name: string
  pattern?: string
  extends?: GenericTypeConfig[]
  export?: boolean  
}

export type MethodConfig = {
  name: string
  annotations?: string[]
  properties?: {
    annotation?: string
    name: string
    type: GenericTypeConfig[] | string[]
  }[]
  returns?: {
    type: GenericTypeConfig[] | string[]
  }
}

export type GenericTypeConfig = {
  name: string
  generics?: GenericTypeConfig[] | string[]
}

export type ImportConfig = {
  imports: string[]
  from: string
}


export type GeneratorConfig = {
  name: string
  pattern?: string
  filename?: string
  type: string
  alias?: string
  imports?: ImportConfig[]
  extends?: GenericTypeConfig[] | string[]
  implements?: GenericTypeConfig[] | string[]
  annotations?: string[]
  methods?: MethodConfig[]
  interfaces?: InterfaceConfig[] | string[]
  types?: TypeConfig[] | string[]
  test?: 'unit' | 'integration' | 'e2e' | 'disabled'
}

export type Config = {
  generators?: GeneratorConfig[]
  modules?: ([string, string] | string)[]
  plugins?: string[]
}