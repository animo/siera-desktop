/* eslint-disable @typescript-eslint/no-var-requires */

const NodeFileSystem = require('@aries-framework/node/build/NodeFileSystem').NodeFileSystem
const { contextBridge } = require('electron')
const indy = require('indy-sdk')
const { default: nodeFetch } = require('node-fetch')

/* eslint-enable @typescript-eslint/no-var-requires */

const fs = new NodeFileSystem()

// Exposes indy to the main world.
contextBridge.exposeInMainWorld('indy', indy)

// Exposes the filesystem, created by @aries-framework/node, to the main world
contextBridge.exposeInMainWorld('fs', {
  write: fs.write,
  read: fs.read,
  basePath: fs.basePath,
  exists: fs.exists,
})

contextBridge.exposeInMainWorld('nodeFetch', async (endpoint, request) => {
  const response = await nodeFetch(endpoint, request)

  return {
    statusCode: response.statusCode,
    body: await response.text(),
  }
})

const getConfigDirForPlatform = (platform, homeDir, appDataDir) => {
  switch (platform) {
    case 'linux' || 'darwin':
      return `${homeDir}/.config/siera/ui/config.json`
    case 'win32':
      return `${appDataDir}/siera/ui/config.json`
  }

  throw new Error(`Unsupported platform: ${platform}`)
}

contextBridge.exposeInMainWorld(
  'configInformation',
  (function () {
    const homeDir = process.env.HOME
    const platform = process.platform
    const appDataDir = process.env.APPDATA

    let unSupportedPlatform = false
    let configDir
    try {
      configDir = getConfigDirForPlatform(platform, homeDir, appDataDir)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Unsupported platform for config persistence', error)
      unSupportedPlatform = true
    }

    return {
      platform: process.platform,
      configDir,
      unSupportedPlatform,
    }
  })()
)
