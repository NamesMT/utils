export function asyncToBlob(canvasEl: HTMLCanvasElement, type?: string, quality?: number): Promise<Blob> {
  return new Promise(resolve => canvasEl.toBlob((blob) => {
    if (!blob)
      throw new Error('Failed to convert canvas to blob')

    resolve(blob)
  }, type, quality))
}
export function blobToDataURI(blob: Blob) {
  return URL.createObjectURL(blob)
}
export function dataURIToBlob(dataURI: string) {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].includes('base64') ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i += 1)
    ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}

export function isValidUrl(urlString: string) {
  const urlPattern = new RegExp('^(?:https?:\\/\\/)?' // validate protocol
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    + '(?:(?:[a-z\\d](?:[a-z\\d-]*[a-z\\d])*\\.)+[a-z]{2,}|(?:\\d{1,3}\\.){3}\\d{1,3})' // validate domain name OR ip (v4) address
    + '(?::\\d+)?(?:\\/[-\\w%.~+]*)*' // validate port and path
    + '(?:\\?[;&\\w%.~+=-]*)?' // validate query string
    + '(?:#[-\\w]*)?$', 'i') // validate fragment locator
  return !!urlPattern.test(urlString)
}
