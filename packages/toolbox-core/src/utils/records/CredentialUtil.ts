import type { CredentialExchangeRecord } from '@aries-framework/core'

import { CredentialState } from '@aries-framework/core'

interface CredentialActions {
  isAcceptable: boolean
  isDeclineable: boolean
}

export class CredentialUtil {
  private static loadingStates: CredentialState[] = [CredentialState.RequestSent, CredentialState.OfferSent]

  private static acceptStates: CredentialState[] = [CredentialState.OfferReceived, CredentialState.CredentialReceived]

  private static declineStates: CredentialState[] = [CredentialState.OfferReceived]

  public static isCredentialWaitingForResponse(credential: CredentialExchangeRecord): boolean {
    return CredentialUtil.loadingStates.includes(credential.state)
  }

  public static isCredentialWaitingForInput(credential: CredentialExchangeRecord): CredentialActions {
    return {
      isAcceptable: CredentialUtil.acceptStates.includes(credential.state),
      isDeclineable: CredentialUtil.declineStates.includes(credential.state),
    }
  }
}
