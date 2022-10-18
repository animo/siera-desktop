import type { FileSystem } from '@aries-framework/core'

export class ElectronFileSystemAdapter implements FileSystem {
  public async downloadToFile(url: string, path: string): Promise<void> {
    const data = await (await fetch(url)).text()
    await window.fs.write(path, data)
  }

  public basePath = window.fs.basePath
  public exists = window.fs.exists
  public read = window.fs.read
  public write = window.fs.write
}
