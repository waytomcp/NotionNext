import Link from 'next/link'

const CategoryGroupServers = ({ currentCategory, categories }) => {
  if (!categories) {
    return <></>
  }
  return <>
    <div id='category-list' className='flex flex-col space-y-2 mx-4'>
      {categories.map(category => {
        const selected = currentCategory === category.name
        return (
          <Link
            key={category.name}
            href={`/category/${category.name}`}
            passHref
            className={(selected
              ? 'bg-indigo-50 text-indigo-600'
              : 'bg-gray-50 dark:bg-[#1e1e1e] text-gray-700 dark:text-gray-300 hover:bg-indigo-50 hover:text-indigo-600') +
              ' rounded-lg flex items-center justify-between px-4 py-3.5 duration-200'}>
            <span>{category.name}</span>
            <span className="text-sm">{category.count}</span>
          </Link>
        )
      })}
    </div>
  </>
}

export default CategoryGroupServers
