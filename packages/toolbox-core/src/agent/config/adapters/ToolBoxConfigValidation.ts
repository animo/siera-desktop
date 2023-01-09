import {
  AutoAcceptCredential,
  AutoAcceptProof,
  DidCommMimeType,
  KeyDerivationMethod,
  MediatorPickupStrategy,
} from '@aries-framework/core'
import { z } from 'zod'

export const WalletConfigSchema = z.object({
  id: z.string(),
  key: z.string(),
  keyDerivationMethod: z.nativeEnum(KeyDerivationMethod).optional(),
  storage: z
    .object({
      type: z.string(),
    })
    .optional(),
  masterSecretId: z.string().optional(),
})

export const IndyLedgerConfigSchema = z.object({
  genesisPath: z.string().optional(),
  genesisTransactions: z.string().optional(),
  id: z.string(),
  isProduction: z.boolean(),
  indyNamespace: z.string(),
  transactionAuthorAgreement: z
    .object({
      version: z.string(),
      acceptanceMechanism: z.string(),
    })
    .optional(),
})

export const InitConfigSchema = z.object({
  endpoints: z.array(z.string()).optional(),
  label: z.string(),
  publicDidSeed: z.string().optional(),
  mediatorRecordId: z.string().optional(),
  walletConfig: WalletConfigSchema.optional(),
  autoAcceptConnections: z.boolean().optional(),
  autoAcceptProofs: z.nativeEnum(AutoAcceptProof).optional(),
  autoAcceptCredentials: z.nativeEnum(AutoAcceptCredential).optional(),
  logger: z.any().optional(),
  didCommMimeType: z.nativeEnum(DidCommMimeType).optional(),
  indyLedgers: z.array(IndyLedgerConfigSchema).optional(),
  connectToIndyLedgersOnStartup: z.boolean().optional(),
  autoAcceptMediationRequests: z.boolean().optional(),
  mediatorConnectionsInvite: z.string().optional(),
  defaultMediatorId: z.string().optional(),
  clearDefaultMediator: z.boolean().optional(),
  mediatorPollingInterval: z.number().optional(),
  mediatorPickupStrategy: z.nativeEnum(MediatorPickupStrategy).optional(),
  maximumMessagePickup: z.number().optional(),
  baseMediatorReconnectionIntervalMs: z.number().optional(),
  maximumMediatorReconnectionIntervalMs: z.number().optional(),
  useDidKeyInProtocols: z.boolean().optional(),
  useLegacyDidSovPrefix: z.boolean().optional(),
  connectionImageUrl: z.string().optional(),
  autoUpdateStorageOnStartup: z.boolean().optional(),
})

export const AgentConfigRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  agentConfig: InitConfigSchema,
})

export const ToolboxConfigSchema = z.object({
  colorScheme: z.enum(['light', 'dark']).default('light'),
  agents: z.array(AgentConfigRecordSchema).default([]),
})
