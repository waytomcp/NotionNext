import { HashTag } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import WordCount from '@/components/WordCount'
import { useGlobal } from '@/lib/global'

import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'

export default function PostHeader({ post, siteInfo, isDarkMode }) {
  const { locale } = useGlobal()
  if (!post) {
    return <></>
  }
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig('ANALYTICS_BUSUANZI_ENABLE')
  const colors = ["blue", "green", "red", "purple", "pink", "yellow", "orange"]
  return (
    <div className='relative mb-6 max-w-7xl mx-auto'>
      {/* 面包屑导航 */}
      <div className='text-sm text-gray-500 dark:text-gray-400 mx-10 my-4'>
        <Link href="/" className='hover:text-blue-500 dark:hover:text-blue-400'>首页</Link>
        <span className='mx-2'>/</span>
        {post.category && (
          <>
            <Link 
              href={`/category/${post.category}`}
              className='hover:text-blue-500 dark:hover:text-blue-400'
            >
              {post.category}
            </Link>
            <span className='mx-2'>/</span>
          </>
        )}
        <span className='text-gray-700 dark:text-gray-300'>{post.title}</span>
      </div>

      <div className='flex flex-col items-start bg-white p-4 mx-10 rounded-lg shadow-sm'>
        {/* 标题 */}
        <div className='text-2xl font-bold text-gray-900 mb-1 flex dark:text-white'>
          {/* {siteConfig('POST_TITLE_ICON') && (
            <NotionIcon icon={post.pageIcon} />
          )} */}
          {post.title}
          <div className="flex items-center gap-2 ml-2">
            {
              post?.bizTags?.map((tag, index) => {
                const color = colors[index % colors.length]
                return (
                  <span className={`bg-${color}-100 text-${color}-800 text-xs py-1 px-2 rounded  h-[1.5rem]`}>{tag}</span>
                );
              })
            }
          </div>
        </div>

        {/* 元信息 */}
        <div className='flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mb-4'>
          {
            post?.author && (
              <div className='flex items-center'>
                <span>{locale.POST.AUTHOR_PREFIX}</span>
                <a className='text-blue-500'>{post.author}</a>
                <span>{locale.POST.AUTHOR_SUFFIX}</span>
              </div>
            )
          }
          {
            post?.lastEditedDay && (
              <div className='flex items-center gap-1'>
                {/* <i className='fas fa-calendar-alt mr-2'></i> */}
                <span>{locale.POST.UPDATE_DATE_PREFIX}</span>
                <span>{post?.lastEditedDay}</span>
              </div>
            )
          }
          <div className='flex items-center'>
            <WordCount
              wordCount={post.wordCount}
              readTime={post.readTime}
            />
          </div>

          {ANALYTICS_BUSUANZI_ENABLE && (
            <div className='flex items-center'>
              <span className='busuanzi_value_page_pv' />
            </div>
          )}
          {
            post?.score && (
              <div className='flex items-center gap-1'>
                {/* <i className='fas fa-calendar-alt mr-2'></i> */}
                <span>Score:</span>
                <span>{post?.score}</span>
              </div>
            )
          }
        </div>

        {/* 分类和标签 */}
        <div className='flex flex-wrap gap-2'>
          {/* {post.category && (
            <Link
              href={`/category/${post.category}`}
              passHref
              className='px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors'>
              {post.category}
            </Link>
          )} */}

          {post.tagItems?.map((tag, index) => (
            <Link
              key={index}
              href={`/tag/${encodeURIComponent(tag.name)}`}
              passHref
              className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'>
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
