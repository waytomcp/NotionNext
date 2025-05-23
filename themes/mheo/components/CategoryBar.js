import { ChevronDoubleLeft, ChevronDoubleRight } from '@/components/HeroIcons'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

/**
 * 博客列表上方嵌入条
 * @param {*} props
 * @returns
 */
export default function CategoryBar(props) {
  const { categoryOptions, border = true } = props
  const { locale } = useGlobal()
  const [scrollRight, setScrollRight] = useState(false)
  // 创建一个ref引用
  const categoryBarItemsRef = useRef(null)

  // 点击#right时，滚动#category-bar-items到最右边
  const handleToggleScroll = () => {
    if (categoryBarItemsRef.current) {
      const { scrollWidth, clientWidth } = categoryBarItemsRef.current
      if (scrollRight) {
        categoryBarItemsRef.current.scrollLeft = 0
      } else {
        categoryBarItemsRef.current.scrollLeft = scrollWidth - clientWidth
      }
      setScrollRight(!scrollRight)
    }
  }

  return (
    <div
      id='category-bar'
      className={`wow fadeInUp flex justify-between  lg:bg-white dark:lg:bg-[#1e1e1e]   w-full md:w-64 mb-8 md:mb-0 md:mr-8 rounded-lg shadow-sm p-4 
            rounded transition-colors duration-200 side-left-bar`}>
      <div
        id='category-bar-items'
        ref={categoryBarItemsRef}
        className='w-full scroll-smooth  rounded'>
        <MenuItem href='/' name={locale.NAV.INDEX} />
        {categoryOptions?.map((c, index) => (
          <MenuItem key={index} href={`/category/${c.name}`} name={c.name} count={c.count} />
        ))}
      </div>
    </div>
  )
}

/**
 * 按钮
 * @param {*} param0
 * @returns
 */
const MenuItem = ({ href, name, count, icon }) => {
  const router = useRouter()
  const { category } = router.query
  const selected = category === name
  return (
    <Link href={href} passHref>
      <div
        className={`border-b pb-3 mb-3 flex justify-between items-center py-2 px-3 rounded cursor-pointer duration-200 transition-all font-normal dark:text-white hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white ${selected ? 'bg-sky-600 text-white dark:bg-sky-600 dark:text-white' : ''}`}
      >
        <div className="flex items-center">
          {/* <span><i className={`fas fa-${icon || "server"} mr-3 text-gray-500`} /></span> */}
          {/* 原本的 Link 组件包裹 name 的部分已移除，因为外部 Link 组件已处理跳转 */}
          {name}
        </div>
        <span className='text-gray-500'>{count || 0}</span>
      </div>
    </Link>
  )
}
