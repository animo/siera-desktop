import type { DidDocument } from '@aries-framework/core'

import { useAgent } from '@aries-framework/react-hooks'
import { Box, Group, Space, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import React, { useState } from 'react'

import { Card } from '../../../components/Card'
import { Header } from '../../../components/Header'
import { Loading } from '../../../components/Loading'
import { SecondaryButton } from '../../../components/generic'
import { RecordCodeBlock } from '../../../components/generic/information/RecordCodeBlock'

interface DidResolveValues {
  did: string
}

export const DidsScreen = () => {
  const form = useForm<DidResolveValues>({ initialValues: { did: '' } })
  const { agent } = useAgent()
  const [isLoading, setIsLoading] = useState(false)
  const [didResult, setDidResult] = useState<DidDocument | undefined>()

  const getErrorMessage = (did: string, error?: string) => {
    const errorMessage: Record<string, (did: string) => string> = {
      invalidDid: (did: string) => `did '${did}' is not a valid did.`,
      notFound: (did: string) => `did '${did}' could not be found. Make sure the did exists.`,
      unsupportedDidMethod: (did: string) => {
        const [, method] = did.split(':')

        // TODO: extract supportedMethods from agent.dids.config.resolvers when updated to 0.4.0
        return `did method '${method}' is not supported at the moment.`
      },
    }

    if (!error || !errorMessage[error]) return ''
    return errorMessage[error](did)
  }

  const resolveDid = async ({ did }: DidResolveValues) => {
    if (isLoading) return

    setIsLoading(true)
    const result = await agent?.dids.resolve(did)
    setIsLoading(false)

    if (!result?.didDocument) {
      showNotification({
        title: 'Error',
        message: `Could not resolve did document. ${getErrorMessage(did, result?.didResolutionMetadata.error)}`,
        color: 'error',
      })
      setDidResult(undefined)
      return
    }

    setDidResult(result.didDocument)
  }

  return (
    <>
      <Header title="Dids" description="Work with did documents." />
      <Card title="Resolve did document" description="Paste in the did to resolve the did document for." withPadding>
        <form onSubmit={form.onSubmit(resolveDid)}>
          <Group>
            <Box w={450} maw="75%">
              <TextInput placeholder="did:example:123" disabled={isLoading} {...form.getInputProps('did')} required />
            </Box>
            <SecondaryButton type="submit" disabled={isLoading}>
              Resolve
            </SecondaryButton>
          </Group>
        </form>
        <Space h="xl" />
        {isLoading ? (
          <Loading />
        ) : didResult ? (
          <Box>
            <RecordCodeBlock record={didResult} />
          </Box>
        ) : null}
      </Card>
    </>
  )
}
