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

contextBridge.exposeInMainWorld('configInformation', {
  homeDir: process.env.HOME,
  platform: process.platform,
  appData: process.env.APPDATA,
})
