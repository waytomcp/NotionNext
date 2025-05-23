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
        className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
        >      
        {/* 内容展示区块 */}
        <div className="p-4 flex flex-col flex-grow"> {/* 让p-4区域能够垂直方向上伸展 */}
          {/* 卡片主要内容区域 - 允许其占据多余空间 */}
          <div className="flex-grow">
            {/* 标题 和 业务标签 (BizTags) */}
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
                        <span key={index} className={`bg-${color}-100 text-${color}-800 text-xs px-2 py-1 rounded`}>{tag}</span>
                      );
                    })
                  }
                </div>
              </div>
            </div>

            {/* 作者 (左对齐) 和 分类 (右对齐) */}
            <div className="flex justify-between items-center text-sm mb-2">
              <div className="text-gray-600">{post.author}</div>
              {post?.category && <div className="text-gray-500">{post.category}</div>}
            </div>

            {/* 摘要 */}
            {post?.summary && (
              <div className="text-gray-700 text-sm mt-1 mb-3 line-clamp-2">{post.summary}</div>
            )}

            {/* 标签 (TagItems) - 左对齐 */}
            {post?.tagItems && post.tagItems.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-start mb-3">
                {post.tagItems.map((tag, index) => (
                  <span key={index} className={`bg-${tag.color}-100 text-${tag.color}-800 text-xs px-2 py-1 rounded`}>{tag.name}</span>
                ))}
              </div>
            )}
          </div>

          {/* 固定在底部的内容：分割线 和 语言/许可证/日期 */}
          <div>
            <hr className="my-3 border-gray-200 dark:border-gray-700" /> {/* 水平分割线 */}
            
            <div className="flex justify-between items-center text-gray-500 text-sm">
              {/* Language - 左对齐 */}
              <span className="flex-none flex items-center">
                <svg
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 mr-1.5"
                  fill="#3B82F6"> {/* Tailwind CSS blue-500 color */}
                  <circle cx="50" cy="50" r="50" />
                </svg>
                {post?.language || ''}
              </span>

              {/* License - 居中 */}
              <span className="flex-grow text-center flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4 mr-1.5"  // 使用Tailwind类控制大小和边距
                  aria-hidden="true">
                    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                    <path d="M7 21h10"></path><path d="M12 3v18"></path>
                    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
                </svg>
                {post?.license || ''}
              </span>

              {/* Last Edited Day - 右对齐 */}
              <div className="flex items-center flex-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 mr-1.5">
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                    clipRule="evenodd" />
                </svg>
                <span>{post?.lastEditedDay || ''}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogPostCard
