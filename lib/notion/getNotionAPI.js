import { NotionAPI as NotionLibrary } from 'notion-client'
import BLOG from '@/blog.config'

const notionAPI = getNotionAPI()

function getNotionAPI() {
  return new NotionLibrary({
    activeUser: BLOG.NOTION_ACTIVE_USER || null,
    authToken: BLOG.NOTION_TOKEN_V2 || null,
    userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  })
}

export default notionAPI

getPage: async (pageId, filter = null) => {
  // 如果有过滤条件，添加到查询参数中
  const queryParams = filter ? { filter } : {};
  
  // 使用 Notion API 查询数据
  if (filter && filter.property === 'status') {
    // 针对 public 属性的特殊处理
    return await notion.databases.query({
      database_id: pageId,
      filter: {
        property: 'status',
        select: { equals: 'Published' }
      }
    });
  } else {
    // 原有的查询逻辑
    return await notion.pages.retrieve({ page_id: pageId });
  }
}
