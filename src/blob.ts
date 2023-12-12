export function asyncToBlob(canvasEl: HTMLCanvasElement, type?: string, quality?: number) {
  return new Promise(resolve => canvasEl.toBlob(resolve, type, quality))
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
