export async function registerIndyDidOnBcovrinTest(): Promise<{ did: string; publicKeyBase58: string; seed: string }> {
  const seed = crypto.getRandomValues(new Uint32Array(4)).join('').substring(0, 32)
  const response = await fetch('http://test.bcovrin.vonx.io/register', {
    method: 'POST',
    body: JSON.stringify({
      seed,
    }),
  })

  const data = await response.json()

  return {
    did: `did:indy:bcovrin:test:${data.did}`,
    publicKeyBase58: data.verkey,
    seed: data.seed,
  }
}
