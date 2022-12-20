import type { IConfigFileRepository, IToolboxConfig } from '@animo/toolbox-core'

import { DefaultConfiguration } from '@animo/toolbox-core'

export class ElectronConfigFileRepository implements IConfigFileRepository {
  public async readConfiguration(): Promise<IToolboxConfig> {
    const filePath = await this.getFilePath()

    const exists = await window.fs.exists(filePath)
    if (!exists) {
      return DefaultConfiguration
    }

    // TODO: think about how to handle new config options
    const configString = await window.fs.read(filePath)
    return JSON.parse(configString) as IToolboxConfig
  }

  public async writeConfiguration(config: IToolboxConfig): Promise<void> {
    const filePath = await this.getFilePath()

    const configString = JSON.stringify(config)

    await window.fs.write(filePath, configString)
  }

  protected async getFilePath(): Promise<string> {
    const { homeDir, appdataDir, platform } = window.configInformation

    switch (platform) {
      case 'darwin':
      case 'linux':
        return `${homeDir}/.config/siera/ui/config.json`
      case 'win32':
        return `${appdataDir}/siera/ui/config.json`
    }

    throw new Error('Platform not implemented.')
  }
}
