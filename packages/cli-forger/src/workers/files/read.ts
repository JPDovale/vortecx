import path from 'path'
import fs from 'fs'
import { File } from './File'
import { isArray } from 'lodash'
import { workers } from '../index'
import { cwd } from 'process'

interface ReadOptions {
  exitOnNotExists?: boolean
  messageWhenNotExists?: string
}

export function read(rawPath: string[] | string, options: ReadOptions = {}) {
  const { exitOnNotExists = true, messageWhenNotExists = ' File not found!' } =
    options
  const rawPaths = isArray(rawPath) ? rawPath : [rawPath]
  const pathToRead = path.resolve(...rawPaths)
  const fileExist = fs.existsSync(pathToRead)

  if (exitOnNotExists && !fileExist) {
    workers.logger.exit.error(
      messageWhenNotExists,
      `files.read ${workers.figures.pointer} ${cwd()}`,
      ` read.path ${workers.figures.pointer} ${pathToRead}`,
    )
  }

  const content = fs.readFileSync(pathToRead, 'utf8')
  const file = File.create({
    path: pathToRead,
    rawContent: content,
  })

  return file
}
