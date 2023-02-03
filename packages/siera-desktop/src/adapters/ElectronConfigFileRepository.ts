import type { ConfigFileRepository, SieraUiConfig } from '@animo/siera-core'

import { DefaultConfiguration, validateAndParseSieraUiConfig } from '@animo/siera-core'

export class ElectronConfigFileRepository implements ConfigFileRepository {
  public constructor(public readonly configPath: string) {}

  public async readConfiguration(): Promise<SieraUiConfig> {
    const exists = await window.fs.exists(this.configPath)
    if (!exists) return DefaultConfiguration

    // TODO: think about how to handle new config options
    const configString = await window.fs.read(this.configPath)

    const config = JSON.parse(configString)

    return validateAndParseSieraUiConfig(config)
  }

  public async writeConfiguration(config: SieraUiConfig): Promise<void> {
    const filePath = this.configPath

    const validatedConfig = validateAndParseSieraUiConfig(config)

    const configString = JSON.stringify(validatedConfig)

    await window.fs.write(filePath, configString)
  }
}
