export function getQualifiedAgentPublicDid<Namespace extends string>(
  unqualifiedDid: string,
  indyNamespace: Namespace
): `did:indy:${Namespace}:${string}` {
  return `did:indy:${indyNamespace}:${unqualifiedDid}`
}
