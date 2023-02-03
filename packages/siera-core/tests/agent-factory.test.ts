import type { AgentDependencies } from '@aries-framework/core'

import { Agent } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/node'

import { AgentFactory } from '../src'

describe('Agent factory', () => {
  test('Create and initialize agent', async () => {
    const agentFactory = new AgentFactory({
      async createAgentDependencies(): Promise<AgentDependencies> {
        return agentDependencies
      },
    })

    const agent = await agentFactory.createAgent({
      label: 'agent',
      walletConfig: { id: 'id01000000000000000000000000000', key: 'key01000000000000000000000000000' },
    })

    expect(agent).toBeInstanceOf(Agent)
    expect(agent.wallet.isInitialized).toBeFalsy()

    await agent.initialize()

    expect(agent.wallet.isInitialized).toBeTruthy()
    expect(agent.wallet.isProvisioned).toBeTruthy()
  })
})
