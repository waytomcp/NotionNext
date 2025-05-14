import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'

/**
 * 服务器首页
 * @param {*} props
 * @returns
 */
// export default function Servers(props) {
//   const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
//   return (
//     <DynamicLayout theme={theme} layoutName='LayoutCategoryIndex' {...props} />
//   )
// }
export default function Server(props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticProps({ locale }) {
  const props = await getGlobalData({ from: 'servers-index-props', locale })
  
  // 只保留 subType 为 servers 的文章
  if (props.allPages) {
    props.posts = props.allPages.filter(
      page => page.type === 'Post' && page.status === 'Published' && page.subType === 'servers'
    )
  }
  props.subType = 'servers'
  
  // 过滤分类选项，只保留包含 servers 类型文章的分类
  if (props.categoryOptions) {
    props.categoryOptions = props.categoryOptions.filter(category => {
      return category.subTypes && category.subTypes.includes('servers')
    })
  }
  
  delete props.allPages
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