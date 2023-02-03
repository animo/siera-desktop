import type { CredentialExchangeRecord } from '@aries-framework/core'

import { CredentialState } from '@aries-framework/core'

export class CredentialsUtil {
  private static loadingStates: CredentialState[] = [CredentialState.RequestSent, CredentialState.OfferSent]

  private static acceptStates: CredentialState[] = [CredentialState.OfferReceived, CredentialState.CredentialReceived]

  private static declineStates: CredentialState[] = [CredentialState.OfferReceived]

  public static isCredentialWaitingForResponse(credential: CredentialExchangeRecord): boolean {
    return CredentialsUtil.loadingStates.includes(credential.state)
  }

  public static isCredentialWaitingForAcceptInput(credential: CredentialExchangeRecord): boolean {
    return CredentialsUtil.acceptStates.includes(credential.state)
  }

  public static isCredentialWaitingForDeclineInput(credential: CredentialExchangeRecord): boolean {
    return CredentialsUtil.declineStates.includes(credential.state)
  }
}
