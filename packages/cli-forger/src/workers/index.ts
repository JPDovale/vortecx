import * as files from './files'
import * as folders from './folders'
import * as logger from './logger'
import figures from './figures'

export type Workers = typeof workers

export const workers = {
  files,
  folders,
  logger,
  figures
}
