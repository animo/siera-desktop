import type { ProofExchangeRecord } from '@aries-framework/core'

import { ProofState } from '@aries-framework/core'

interface ProofActions {
  isAcceptable: boolean
  isDeclineable: boolean
}

export class ProofUtil {
  private static loadingStates: ProofState[] = [ProofState.PresentationSent, ProofState.RequestSent]

  private static acceptStates: ProofState[] = [ProofState.RequestReceived]
  private static declineStates: ProofState[] = [ProofState.RequestReceived]

  public static isProofWaitingForResponse(proof: ProofExchangeRecord): boolean {
    return ProofUtil.loadingStates.includes(proof.state)
  }

  public static isProofWaitingForInput(proof: ProofExchangeRecord): ProofActions {
    return {
      isAcceptable: ProofUtil.acceptStates.includes(proof.state),
      isDeclineable: ProofUtil.declineStates.includes(proof.state),
    }
  }
}
