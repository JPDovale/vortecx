import fs from 'fs'
import { workers } from '../index'
import { isArray } from 'lodash'
import path from 'path'
import { cwd } from 'process'
import { mainSymbols } from 'figures'

interface CreateIfNotExistsOptions {
  exitOnExists?: boolean
  messageWhenExists?: string
  showInfosLog?: boolean
}

export function createIfNotExists(
  rawPath: string[] | string,
  options: CreateIfNotExistsOptions = {},
) {
  const {
    exitOnExists = true,
    messageWhenExists = ' Path already exists!',
    showInfosLog = false,
  } = options
  const pathsToFind = isArray(rawPath) ? rawPath : [rawPath]

  if (pathsToFind.length === 0) {
    workers.logger.exit.error(
      'Path is missing!',
      `folders.createIfNotExists ${mainSymbols.pointer} ${cwd()}`,
    )
  }

  const pathToFind = path.resolve(...pathsToFind)
  const existsPath = fs.existsSync(pathToFind)

  if (exitOnExists && existsPath) {
    workers.logger.exit.error(
      messageWhenExists,
      `folders.createIfNotExists ${mainSymbols.pointer} ${cwd()}`,
      `              exists.path ${mainSymbols.pointer} ${pathToFind}`,
    )
  }

  if (!exitOnExists && existsPath) {
    workers.logger.info(messageWhenExists)
  }

  if (!existsPath) {
    try {
      if (showInfosLog) {
        workers.logger.info(
          ` Creating folder ${mainSymbols.pointer} ${pathToFind}`,
        )
      }
      fs.mkdirSync(pathToFind, { recursive: true })
    } catch (err) {
      workers.logger.exit.error('Cannot create folder', pathToFind, err)
    }
  }
}
