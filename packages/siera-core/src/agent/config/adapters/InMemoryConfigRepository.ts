import type { ConfigFileRepository } from '../ConfigFileRepository'
import type { SieraUiConfig } from '../SieraUiConfig'

export class InMemoryConfigRepository implements ConfigFileRepository {
  public constructor(private config: SieraUiConfig) {}

  public async readConfiguration(): Promise<SieraUiConfig> {
    return this.config
  }

  public async writeConfiguration(config: SieraUiConfig): Promise<void> {
    this.config = config
  }
}
