export const useComponents = async () => {
  const { data: components } = await useAsyncData('components-config', async () => {
    try {
      const content = await queryCollection('components').first()
      return content || {}
    } catch {
      return {}
    }
  })
  return components
}
