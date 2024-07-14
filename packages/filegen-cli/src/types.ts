interface Module {
  name: string | [string, string];
  types: (string | [string, string])[];
  ext?: string;
}

export interface Config {
  modules: Module[];
}