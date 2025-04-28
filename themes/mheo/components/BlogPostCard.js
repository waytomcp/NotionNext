import LazyImage from '@/components/LazyImage'
import NotionIcon from './NotionIcon'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const colors = ["blue", "green", "red", "purple", "pink", "yellow", "orange"]
  const showPreview =
    siteConfig('HEO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('HEO_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview
  const POST_TWO_COLS = siteConfig('HEO_HOME_POST_TWO_COLS', true, CONFIG)
  const COVER_HOVER_ENLARGE = siteConfig(
    'HEO_POST_LIST_COVER_HOVER_ENLARGE',
    true,
    CONFIG
  )

  return (
    <article
      className={`${COVER_HOVER_ENLARGE ? 'hover:transition-all duration-150' : ''} flex flex-col h-full`}>
      <div
        data-wow-delay='.2s'
        // className={
        //   (POST_TWO_COLS ? '2xl:h-96 2xl:flex-col' : '') +
        //   ' wow fadeInUp border bg-white dark:bg-[#1e1e1e] flex mb-4 flex-col h-[23rem] md:h-52 md:flex-row  group w-full dark:border-gray-600 hover:border-indigo-600  dark:hover:border-yellow-600 duration-300 transition-colors justify-between overflow-hidden rounded'
        // }
        className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
        >      
        {/* 图片封面 */}
 {/*           
        {showPageCover && (
          <Link href={post?.href} passHref legacyBehavior>
            <div
              className={
                (POST_TWO_COLS ? ' 2xl:w-full' : '') +
                ' w-full md:w-5/12 overflow-hidden cursor-pointer select-none'
              }>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='h-full w-full object-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-500 ease-in-out' //宽高都调整为自适应,保证封面居中
              />
            </div>
          </Link>
        )}
*/}
        {/* 内容展示区块 */}
        <div className="p-4">
          <div className="border-b pb-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <Link
                  href={post?.href}
                  passHref>
                  <h4 className="text-blue-600 font-medium mr-2">{post.title}</h4>
                </Link>
                <div className="flex gap-2">
                  {
                    post?.bizTags?.map((tag, index) => {
                      const color = colors[index % colors.length]
                      return (
                        <span className={`bg-${color}-100 text-${color}-800 text-xs px-2 py-1 rounded`}>{tag}</span>
                      );
                    })
                  }
                </div>
              </div>
            </div>
            <div className="text-gray-600 text-sm">{post.author}</div>
            { post?.category && <div className="text-gray-500 text-sm mt-2">分类：{post.category}</div> }
            {post?.summary && <div className="text-gray-700 mt-2 line-clamp-2">{post.summary}</div>}
          </div>
          <div className="pt-4">
            <div className="flex flex-wrap gap-2 mb-3">
                {
                  post?.tagItems?.map((tag, index) => {
                    return (
                      <span key={index} className={`bg-${tag.color}-100 text-${tag.color}-800 text-xs px-2 py-1 rounded`}>{tag.name}</span>
                    )
                  })
                }
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <i className="fa fa-alarm-clock" />
              <span>最后更新时间：{post?.lastEditedDay || ''}</span>
            </div>    
          </div>
        </div>
        {/* 文字区块 */}
        {/* <div
          className={
            (POST_TWO_COLS ? '2xl:p-4 2xl:h-48 2xl:w-full' : '') +
            ' flex p-4  flex-col justify-between h-48 md:h-full w-full md:w-7/12'
          }
          >
          <header> */}
            {/* 分类 */}
            {/* {post?.category && (
              <div
                className={`flex mb-1 items-center ${showPreview ? 'justify-center' : 'justify-start'} hidden md:block flex-wrap dark:text-gray-300 text-gray-600 hover:text-indigo-700 dark:hover:text-yellow-500`}>
                <Link
                  passHref
                  href={`/category/${post.category}`}
                  className='cursor-pointer text-xs font-normal menu-link '>
                  {post.category}
                </Link>
              </div>
            )} */}

            {/* 标题和图标 */}
            {/* <Link
              href={post?.href}
              passHref
              className={
                ' group-hover:text-indigo-700 dark:hover:text-yellow-700 dark:group-hover:text-yellow-600 text-black dark:text-gray-100  line-clamp-2 replace cursor-pointer text-xl font-extrabold leading-tight'
              }>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                icon={post.pageIcon}
                className="heo-icon w-6 h-6 mr-1 align-middle transform translate-y-[-8%]" // 专门为 Heo 主题的图标设置样式
              />
              )}
              <span className='menu-link '>{post.title}</span>
            </Link>
          </header> */}

          {/* 摘要 */}
          {/* {(!showPreview || showSummary) && (
            <main className='line-clamp-2 replace text-gray-700  dark:text-gray-300 text-sm font-light leading-tight'>
              {post.summary}
            </main>
          )}

          <div className='md:flex-nowrap flex-wrap md:justify-start inline-block'>
            <div>
              {' '}
              {post.tagItems?.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </article>
  )
}

export default BlogPostCard
