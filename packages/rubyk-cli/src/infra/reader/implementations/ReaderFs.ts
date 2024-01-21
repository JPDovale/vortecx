import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { Reader } from '../contracts/Reader'
import * as fs from 'fs'

export class ReaderFs implements Reader {
  findConfigFile(): string {
    const configFileName = 'rubyk.ts'
    const configFilePath = `${process.cwd()}/${configFileName}`

    if (!fs.existsSync(configFilePath)) {
      throw new NotFoundError(`Config file`)
    }

    return configFilePath
  }
}
