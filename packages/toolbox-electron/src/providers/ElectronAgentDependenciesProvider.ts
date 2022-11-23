import type { IAgentDependenciesProvider } from '@animo/toolbox-core'
import type { AgentDependencies } from '@aries-framework/core'
import type Indy from 'indy-sdk'
import type { RequestInit } from 'node-fetch'

import { AriesFrameworkError, IndySdkError } from '@aries-framework/core'
import * as events from 'events'

import { ElectronFileSystemAdapter } from '../adapters/ElectronFileSystemAdapter'

export class ElectronAgentDependenciesProvider implements IAgentDependenciesProvider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public wrapIndyCallWithErrorHandling(func: any) {
    return async (...args: unknown[]) => {
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

  public wrapIndyWithErrorHandling(indy: typeof Indy) {
    return Object.fromEntries(
      Object.entries(indy).map(([funcName, funcImpl]) => [funcName, this.wrapIndyCallWithErrorHandling(funcImpl)])
    )
  }

  public async emulateFetch(
    endpoint: string,
    request: RequestInit
  ): Promise<Pick<Response, 'text' | 'json' | 'status'>> {
    // TODO: Add support for the AbortController
    delete request.signal

    const { body, statusCode } = await window.nodeFetch(endpoint, request)

    return {
      status: statusCode,
      text: async () => body,
      json: async () => JSON.parse(body),
    }
  }

  public async createAgentDependencies(): Promise<AgentDependencies> {
    const indyWithErrorHandling = this.wrapIndyWithErrorHandling(window.indy)

    return {
      indy: indyWithErrorHandling as unknown as typeof Indy,
      FileSystem: ElectronFileSystemAdapter,
      fetch: this.emulateFetch as never,
      EventEmitterClass: events.EventEmitter,
      WebSocketClass: WebSocket as never,
    }
  }
}
