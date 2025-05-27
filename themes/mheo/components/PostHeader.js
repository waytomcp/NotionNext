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
    <div className='relative mb-6 max-w-[96rem] mx-auto'>
      {/* 面包屑导航 */}
      <div className='text-sm text-gray-500 dark:text-gray-400 my-4'>
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

      <div className='flex flex-col items-start bg-white py-4 px-6 rounded-lg shadow-sm dark:bg-gray-800'>
        {/* 第1行：标题（左对齐）、业务标签，查看源码（右对齐） */}
        <div className='w-full flex justify-between items-center mb-3'>
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>{post.title}</h1>
            <div className="flex items-center gap-2 ml-2">
              {
                post?.bizTags?.map((tag, index) => {
                  const color = colors[index % colors.length]
                  return (
                    <span key={index} className={`bg-${color}-100 text-${color}-800 text-xs py-1 px-2 rounded h-[1.5rem]`}>{tag}</span>
                  );
                })
              }
            </div>
          </div>
          {post.url && (
            <a 
              href={post.url.trim()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <i className="fab fa-github text-3xl mr-4"></i>
              <span>查看源码</span>
            </a>
          )}
        </div>

        {/* 第2行：保持现有元信息展示不变 */}
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
                <span>Score:</span>
                <span>{post?.score}</span>
              </div>
            )
          }
        </div>

        {/* 第3行：显示摘要 */}
        {post.summary && (
          <div className='w-full text-gray-700 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-700 p-3 rounded'>
            <p>{post.summary}</p>
          </div>
        )}

        {/* 第4行：合理间隔显示标签、语言、License */}
        <div className='w-full flex flex-wrap items-center gap-4 mt-2'>
          {/* 标签 */}
          {post.tagItems && post.tagItems.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {post.tagItems.map((tag, index) => (
                <Link
                  key={index}
                  href={`/tag/${encodeURIComponent(tag.name)}`}
                  passHref
                  className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'>
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
          
          {/* 语言 */}
          {post.language && (
            <div className='flex items-center gap-1 px-3 py-1 rounded'>
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 mr-1.5"
                fill="#3B82F6"> {/* Tailwind CSS blue-500 color */}
                <circle cx="50" cy="50" r="50" />
              </svg>
              <span className='text-sm text-gray-700 dark:text-gray-300'>{post.language}</span>
            </div>
          )}
          
          {/* License */}
          {post.license && (
            <div className='flex items-center gap-1 px-3 py-1 rounded'>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4 mr-1.5"
                aria-hidden="true">
                  <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                  <path d="M7 21h10"></path>
                  <path d="M12 3v18"></path>
                  <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
              </svg>
              <span className='text-sm text-gray-700 dark:text-gray-300'>{post.license}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
