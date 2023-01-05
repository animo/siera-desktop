import type { ConfigFileRepository } from '../ConfigFileRepository'
import type { ToolboxConfig } from '../ToolboxConfig'

export class InMemoryConfigRepository implements ConfigFileRepository {
  public constructor(private config: ToolboxConfig) {}

  public async readConfiguration(): Promise<ToolboxConfig> {
    return this.config
  }

  public async writeConfiguration(config: ToolboxConfig): Promise<void> {
    this.config = config
  }
}
