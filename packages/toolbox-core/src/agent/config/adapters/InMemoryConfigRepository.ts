import type { ConfigFileRepository } from '../ConfigFileRepository'
import type { ToolboxConfig } from '../ToolboxConfig'

import { DefaultConfiguration } from '../DefaultConfiguration'

export class InMemoryConfigRepository implements ConfigFileRepository {
  private config: ToolboxConfig

  public constructor() {
    this.config = DefaultConfiguration
  }

  public async readConfiguration(): Promise<ToolboxConfig> {
    return this.config
  }

  public async writeConfiguration(config: ToolboxConfig): Promise<void> {
    this.config = config
  }
}
