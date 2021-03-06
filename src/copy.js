const CappedClient = require('./lib/cappedClient')
const { clipboard, nativeImage } = require('electron')

/**
 * Given an id, coyp the data to the clipboard.
 */
module.exports = (pluginContext) => {
  const { cwd } = pluginContext

  return (id) => {
    const clipCollection = CappedClient.init(cwd, {})
    return clipCollection.findOne(id).then((clip) => {
      if (clip.type === 'text') {
        clipboard.writeText(clip.raw)
      } else if (clip.type === 'image') {
        const image = nativeImage.createFromDataURL(clip.raw)
        clipboard.writeImage(image)
      }
    })
  }
}
