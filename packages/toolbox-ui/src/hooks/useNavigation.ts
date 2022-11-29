import { useNavigate } from 'react-router-dom'

interface UseNavigationHook {
  goBack(): void
  navigate(route: string): void
  replace(route: string): void
}

export const useNavigation = (): UseNavigationHook => {
  const navigate = useNavigate()

  return {
    goBack: () => navigate(-1),
    navigate: (route: string) => navigate(route),
    replace: (route: string) => navigate(route, { replace: true }),
  }
}
