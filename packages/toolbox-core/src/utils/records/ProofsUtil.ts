import type { ProofExchangeRecord } from '@aries-framework/core'

import { ProofState } from '@aries-framework/core'

export class ProofsUtil {
  private static loadingStates: ProofState[] = [ProofState.PresentationSent, ProofState.RequestSent]

  private static acceptStates: ProofState[] = [ProofState.RequestReceived]
  private static declineStates: ProofState[] = [ProofState.RequestReceived]

  public static isProofWaitingForResponse(proof: ProofExchangeRecord): boolean {
    return ProofsUtil.loadingStates.includes(proof.state)
  }

  public static isProofWaitingForAcceptInput(proof: ProofExchangeRecord): boolean {
    return ProofsUtil.acceptStates.includes(proof.state)
  }

  public static isProofWaitingForDeclineInput(proof: ProofExchangeRecord): boolean {
    return ProofsUtil.declineStates.includes(proof.state)
  }
}
