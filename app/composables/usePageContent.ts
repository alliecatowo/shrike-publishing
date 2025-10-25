export const usePageContent = async (page: string) => {
  const { data: pageContent } = await useAsyncData(`page-content-${page}`, async () => {
    try {
      const content = await queryCollection('pages').first()
      return content?.[page] || {}
    } catch {
      return {}
    }
  })
  return pageContent
}
