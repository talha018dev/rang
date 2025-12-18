export const useApi = () => {
  const config = useRuntimeConfig()
  const backendUrl = config.public.backendUrl
  
  // Extract base URL (replace only the second occurrence of /api)
  let baseUrl = backendUrl
  const firstIndex = backendUrl.indexOf('/api')
  if (firstIndex !== -1) {
    const secondIndex = backendUrl.indexOf('/api', firstIndex + 1)
    if (secondIndex !== -1) {
      baseUrl = backendUrl.substring(0, secondIndex) + backendUrl.substring(secondIndex + 4)
    }
  }
  
  return {
    backendUrl,
    baseUrl
  }
}

