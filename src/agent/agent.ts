import {Agent, AriesFrameworkError, ConsoleLogger, FileSystem, IndySdkError, LogLevel} from "@aries-framework/core"
import events from "events"
import ws from "ws"
import Indy from "indy-sdk"
import fetch from "node-fetch"

// agentDependencies in the config requires filesystem to a class instance
class ElectronFileSystem implements FileSystem {
  async downloadToFile(url: string, path: string): Promise<void> {
    const data = await (await fetch(url)).text()
    await window.fs.write(path, data)
  }
  basePath = window.fs.basePath
  exists = window.fs.exists
  read = window.fs.read
  write = window.fs.write
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
          name: "IndyError",
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
    fetch,
    EventEmitterClass: events.EventEmitter,
    WebSocketClass: ws,
  }

  const agent = new Agent(
    { label: "agent", walletConfig: { id: "id01", key: "key01" }, logger: new ConsoleLogger(LogLevel.test) },
    electronAgentDependencies
  )

  await agent.initialize()

  return agent
}
