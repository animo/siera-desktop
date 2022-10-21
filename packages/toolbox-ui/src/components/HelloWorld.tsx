import React from 'react'

export function HelloWorld({ name }: { name: string }) {
  return (
    <>
      <p className={'bg-blue-700'}>Hello {name}</p>
    </>
  )
}
