import type { routeUrls } from '../routes'

import { useNavigate } from 'react-router-dom'

type Routes = typeof routeUrls
// eslint-disable-next-line @typescript-eslint/ban-types
type ExtractValues<T extends string, U extends object = {}> = T extends `${string}{${infer V}}${infer Rest}`
  ? ExtractValues<Rest, U & { [key in V]: string }>
  : U

type RouteValues<S extends Routes[number]> = ExtractValues<S>

function constructRoute<T extends Routes[number], Payload = RouteValues<T>>(
  ...args: keyof Payload extends never ? [route: T] : [route: T, payload: RouteValues<T>]
): string {
  const [url, payload] = args
  if (!payload) return url

  let formattedUrl: string = url
  for (const [key, value] of Object.entries(payload)) {
    formattedUrl = formattedUrl.replace(`{${key}}`, `${value}`)
  }

  return formattedUrl
}

interface UseNavigationHook {
  goBack(): void

  navigate<T extends Routes[number], Payload = ExtractValues<T>>(
    ...args: keyof Payload extends never ? [route: T] : [route: T, payload: ExtractValues<T>]
  ): void

  replace<T extends Routes[number], Payload = ExtractValues<T>>(
    ...args: keyof Payload extends never ? [route: T] : [route: T, payload: ExtractValues<T>]
  ): void
  unSafeNavigate(route: string): void
}

export const useNavigation = (): UseNavigationHook => {
  const navigate = useNavigate()

  return {
    goBack() {
      navigate(-1)
    },
    navigate<T extends Routes[number], Payload = ExtractValues<T>>(
      ...args: keyof Payload extends never ? [route: T] : [route: T, payload: ExtractValues<T>]
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigate(constructRoute(...args))
    },
    replace<T extends Routes[number], Payload = ExtractValues<T>>(
      ...args: keyof Payload extends never ? [route: T] : [route: T, payload: ExtractValues<T>]
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigate(constructRoute(...args), { replace: true })
    },
    unSafeNavigate(route: string) {
      navigate(route)
    },
  }
}
