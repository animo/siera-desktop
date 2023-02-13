import type { UpdateInformation } from '@animo/siera-ui/src/contexts/UpdateInformation'

import { FetchUpdateInformationError } from '@animo/siera-ui/src/errors/FetchUpdateInformationError'

const getLatestRelease = async (owner: string, repo: string): Promise<any> => {
  const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`
  const response = await fetch(url)

  if (!response.ok) {
    throw new FetchUpdateInformationError(`Failed to fetch latest release from ${url}`)
  }

  return response.json()
}

export const fetchUpdateInformation = async (owner: string, repo: string): Promise<UpdateInformation> => {
  const release = await getLatestRelease(owner, repo)
  const version = release.tag_name
  const htmlUrl = release.html_url

  return {
    url: htmlUrl,
    version,
  }
}
