import type { FileSystem } from '@aries-framework/core'
import type Indy from 'indy-sdk'

import { Agent, AriesFrameworkError, ConsoleLogger, IndySdkError, LogLevel } from '@aries-framework/core'
import events from 'events'

// agentDependencies in the config requires filesystem to a class instance
class ElectronFileSystem implements FileSystem {
  public async downloadToFile(url: string, path: string): Promise<void> {
    const data = await (await fetch(url)).text()
    await window.fs.write(path, data)
  }

  public basePath = window.fs.basePath
  public exists = window.fs.exists
  public read = window.fs.read
  public write = window.fs.write
}

// Adds "correct" error handling to indy functions
// TODO: Improve on typings
// TODO: Extract to a more logical location
const wrapIndyCallWithErrorHandling = (func: any) => {
  return async (...args: any[]) => {
    try {
      return await func(...args)
    } catch (e) {
      if (e instanceof Error || e instanceof AriesFrameworkError || e instanceof IndySdkError) {
        throw {
          name: 'IndyError',
          indyName: e.message,
          message: e.message,
          stack: e.stack,
        }
      }
    }
  }
}

const indyWithErrorHandling = Object.fromEntries(
  Object.entries(window.indy).map(([funcName, funcImpl]) => [funcName, wrapIndyCallWithErrorHandling(funcImpl)])
)

export const agentInitializer = async () => {
  const electronAgentDependencies = {
    indy: indyWithErrorHandling as unknown as typeof Indy,
    FileSystem: ElectronFileSystem,
    fetch: fetch as any,
    EventEmitterClass: events.EventEmitter,
    WebSocketClass: WebSocket as any,
  }

  const agent = new Agent(
    { label: 'agent', walletConfig: { id: 'id01', key: 'key01' }, logger: new ConsoleLogger(LogLevel.test) },
    electronAgentDependencies
  )

  await agent.initialize()

  return agent
}
