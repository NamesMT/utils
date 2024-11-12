import { escapeRegex } from './base'

export function replaceMap(string: string, map: Record<string, string>) {
  for (const [find, replace] of Object.entries(map)) {
    const findRE = new RegExp(escapeRegex(find), 'g')
    string = string.replace(findRE, replace)
  }

  return string
}
