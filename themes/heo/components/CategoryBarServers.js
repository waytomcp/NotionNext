import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * 分类导航组件
 * @param {*} props
 * @returns
 */
export default function CategoryBar(props) {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const { category } = router.query

  return (
    <div className='hidden lg:block flex-shrink-0 w-56'>
      <div className='sticky top-8'>
        <div className='bg-white dark:bg-[#1e1e1e] rounded-xl p-4'>
          <div className='text-xl font-bold mb-4 text-gray-900 dark:text-gray-100'>
            {locale.COMMON.CATEGORY}
          </div>
          
          <div className='flex flex-col space-y-2'>
            <Link
              href='/'
              className={`rounded-lg px-4 py-2.5 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between ${
                !category ? 'bg-gray-50 dark:bg-gray-800 text-indigo-600 dark:text-yellow-600' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span>全部</span>
              <span className='text-sm opacity-80'>{categoryOptions?.reduce((sum, c) => sum + c.count, 0)}</span>
            </Link>

            {categoryOptions?.map((c, index) => (
              <Link
                key={index}
                href={`/category/${c.name}`}
                className={`rounded-lg px-4 py-2.5 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between ${
                  category === c.name ? 'bg-gray-50 dark:bg-gray-800 text-indigo-600 dark:text-yellow-600' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span>{c.name}</span>
                <span className='text-sm opacity-80'>{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
