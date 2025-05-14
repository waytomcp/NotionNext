import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'

/**
 * 服务器分类页
 * @param {*} props
 * @returns
 */
export default function Server(props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticProps({ params: { server }, locale }) {
  const from = 'server-props'
  let props = await getGlobalData({ from, locale })

    
  // 过滤分类选项，只保留包含 servers 类型文章的分类
  if (props.categoryOptions) {
    props.categoryOptions = props.categoryOptions.filter(category => {
      return category.subTypes && category.subTypes.includes('servers')
    })
  }

  // 过滤状态
  props.posts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published' && page.subType === 'servers'
  )

  // 处理过滤
  props.posts = props.posts.filter(
    post => post && post.category && post.category.includes(server)
  )

  props.subType = 'servers'

  // 处理文章页数
  props.postCount = props.posts.length
  // 处理分页
  if (siteConfig('POST_LIST_STYLE') === 'scroll') {
    // 滚动列表 给前端返回所有数据
  } else if (siteConfig('POST_LIST_STYLE') === 'page') {
    props.posts = props.posts?.slice(
      0,
      siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
    )
  }

  delete props.allPages

  props = { ...props, category: server, server }

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export async function getStaticPaths() {
  const from = 'server-paths'
  const { categoryOptions } = await getGlobalData({ from })
  
  // 获取所有分类作为服务器路径
  return {
    paths: Object.keys(categoryOptions).map(category => ({
      params: { server: categoryOptions[category]?.name }
    })),
    fallback: true
  }
}