import type { ConnectionRecord } from '@aries-framework/core'

import { DidExchangeState } from '@aries-framework/core'

interface ConnectionActions {
  isAcceptable: boolean
}

export class ConnectionUtil {
  private static loadingStates: DidExchangeState[] = [
    DidExchangeState.ResponseSent,
    DidExchangeState.RequestSent,
    DidExchangeState.InvitationSent,
  ]

  public static acceptStates: DidExchangeState[] = [DidExchangeState.InvitationReceived]

  public static isConnectionWaitingForResponse(connection: ConnectionRecord): boolean {
    return ConnectionUtil.loadingStates.includes(connection.state)
  }

  public static isConnectionWaitingForInput(connection: ConnectionRecord): ConnectionActions {
    return {
      isAcceptable: ConnectionUtil.acceptStates.includes(connection.state),
    }
  }
}
