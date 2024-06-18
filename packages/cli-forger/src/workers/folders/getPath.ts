import { isArray } from 'lodash'
import path from 'path'

export function getPath(rawPath: string[] | string) {
  const rawPaths = isArray(rawPath) ? rawPath : [rawPath]
  const pathToCheck = path.resolve(...rawPaths)
  return pathToCheck
}
