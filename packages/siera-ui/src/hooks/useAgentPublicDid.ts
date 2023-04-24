import { getQualifiedAgentPublicDid } from '@animo/siera-core'
import { useAgent } from '@aries-framework/react-hooks'

export function useAgentPublicDid() {
  const { agent } = useAgent()
  const publicDid = agent?.publicDid?.did

  if (!publicDid) return null

  const indyNamespace = agent.config.indyLedgers[0].indyNamespace
  return getQualifiedAgentPublicDid(agent.publicDid.did, indyNamespace)
}
