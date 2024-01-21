import { Config } from "src/types";

export function ConfigFactory(config: Config) {
  return () => config
}
