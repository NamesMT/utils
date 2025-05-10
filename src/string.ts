import { escapeRegex } from './base'

/**
 * Do replaces on a string using a map (Record)
 * 
 * @param recursive - If true, will retry all replacements until no more replacements are made
 */
export function replaceByMap(str: string, map: Record<string, string>, recursive: boolean = false): string {
  const entries = Object.entries(map)
  const builtRegExp: Record<string, RegExp> = {}
  const doReplaces = () => {
    for (const [find, replace] of entries) {
      if (builtRegExp[find] === undefined)
        builtRegExp[find] = new RegExp(escapeRegex(find), 'g')
      
      const findRE = builtRegExp[find]
      str = str.replace(findRE, replace)
    }
  }
  
  let mirror = str
  doReplaces()

  if (recursive) {
    while (mirror !== str) {
      mirror = str
      doReplaces()
    }
  }

  return str
}

/**
 * @deprecated Use {@link replaceByMap} instead
 */
export const replaceMap = replaceByMap
