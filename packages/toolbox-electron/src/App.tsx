import { useAgent } from '@aries-framework/react-hooks'
import React from 'react'

const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

export function App() {
  const { agent } = useAgent()

  return (
    <>
      <div>
        <h1>test</h1>
        <p>Agent: {JSON.stringify(agent, getCircularReplacer())}</p>
      </div>
    </>
  )
}
