import type { ConfigFileRepository, ToolboxConfig } from '@animo/toolbox-core'

import { DefaultConfiguration, validateToolboxConfig } from '@animo/toolbox-core'

export class ElectronConfigFileRepository implements ConfigFileRepository {
  public constructor(public readonly configPath: string) {}

  public async readConfiguration(): Promise<ToolboxConfig> {
    const exists = await window.fs.exists(this.configPath)
    if (!exists) return DefaultConfiguration

    // TODO: think about how to handle new config options
    const configString = await window.fs.read(this.configPath)

    const config = JSON.parse(configString) as ToolboxConfig

    validateToolboxConfig(config)

    return config
  }

  private validateToolboxConfig(config: ToolboxConfig) {
    validateToolboxConfig(config)
  }

  public async writeConfiguration(config: ToolboxConfig): Promise<void> {
    const filePath = this.configPath

    const configString = JSON.stringify(config)

    await window.fs.write(filePath, configString)
  }
}
