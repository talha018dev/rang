export const useApi = () => {
  const config = useRuntimeConfig()
  const backendUrl = config.public.backendUrl
  // Extract base URL (without /api) for images
  const baseUrl = backendUrl.replace('/api', '')
  
  return {
    backendUrl,
    baseUrl
  }
}

