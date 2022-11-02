import { AgentFactory } from '../src'
import { Agent, AgentDependencies } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/node'

describe('Agent factory', () => {
  test('Create agent', async () => {

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

    await agent.initialize()

    expect(agent.wallet.isInitialized).toBeTruthy()
    expect(agent.wallet.isProvisioned).toBeTruthy()
  })
})