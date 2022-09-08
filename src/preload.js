const { contextBridge } = require("electron")
const indy = require("indy-sdk")
const NodeFileSystem = require("@aries-framework/node/build/NodeFileSystem").NodeFileSystem

const fs = new NodeFileSystem()

console.log(fs.basePath);

// Exposes indy to the main world.
contextBridge.exposeInMainWorld("indy", indy)

// Exposes the filesystem, created by @aries-framework/node, to the main world
contextBridge.exposeInMainWorld("fs", {
    write: fs.write,
    read: fs.read,
    basePath: fs.basePath,
    exists: fs.exists,
})