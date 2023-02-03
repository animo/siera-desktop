import type { ConnectionRecord } from '@aries-framework/core'

import { DidExchangeState } from '@aries-framework/core'

export class ConnectionsUtil {
  private static loadingStates: DidExchangeState[] = [
    DidExchangeState.ResponseSent,
    DidExchangeState.RequestSent,
    DidExchangeState.InvitationSent,
  ]

  public static acceptStates: DidExchangeState[] = [
    DidExchangeState.InvitationReceived,
    DidExchangeState.RequestReceived,
  ]

  public static declineStates: DidExchangeState[] = [DidExchangeState.RequestReceived]

  public static isConnectionWaitingForResponse(connection: ConnectionRecord): boolean {
    return ConnectionsUtil.loadingStates.includes(connection.state)
  }

  public static isConnectionWaitingForAcceptInput(connection: ConnectionRecord): boolean {
    return ConnectionsUtil.acceptStates.includes(connection.state)
  }

  public static isConnectionWaitingForDeclineInput(connection: ConnectionRecord): boolean {
    return ConnectionsUtil.declineStates.includes(connection.state)
  }
}
