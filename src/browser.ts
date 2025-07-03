export function browserDownloadFile(file: File) {
  const el = document.createElement('a')
  el.download = file.name
  el.href = URL.createObjectURL(file)
  el.style.display = 'none'

  // Add to DOM and click to trigger download
  document.body.appendChild(el)
  el.click()

  // Remove from DOM after a delay cause some browsers like it that way
  setTimeout(() => {
    URL.revokeObjectURL(el.href)
    el.parentNode!.removeChild(el)
  }, 60000)
}
