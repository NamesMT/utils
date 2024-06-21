export const unix = () => Math.floor(+Date.now() / 1000)

/**
 * Simple function to convert seconds into HH:MM:SS
 */
export function toHHMMSS(seconds: number) {
  if (typeof seconds !== 'number')
    return 'N/A'

  const s = Math.round(seconds)
  const HH = Math.trunc(s / 3600).toString().padStart(2, '0')
  const MM = (Math.trunc(s / 60) % 60).toString().padStart(2, '0')
  const SS = (s % 60).toString().padStart(2, '0')

  return `${HH}:${MM}:${SS}`
}
