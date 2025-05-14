import { isIterable } from '../utils'

/**
 * 获取所有文章的标签
 * @param allPosts
 * @param sliceCount 默认截取数量为12，若为0则返回全部
 * @param categoryOptions categories的下拉选项
 * @returns {Promise<{}|*[]>}
 */

/**
 * 获取所有文章的分类
 * @param allPosts
 * @returns {Promise<{}|*[]>}
 */
export function getAllCategories({
  allPages,
  categoryOptions,
  sliceCount = 0
}) {
  const allPosts = allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )
  if (!allPosts || !categoryOptions) {
    return []
  }
  // 计数
  let categories = allPosts?.map(p => ({ category: p.category, subType: p.subType }))
  categories = [...categories.flat().map(item => {
    if (typeof item === 'string') {
      return { category: item, subType: undefined }
    }
    return item
  })]
  
  // 创建分类对象，同时记录subType
  const categoryObj = {}
  const subTypeMap = {}
  
  categories.forEach(item => {
    const category = item.category
    const subType = item.subType
    
    if (category) {
      if (category in categoryObj) {
        categoryObj[category]++
      } else {
        categoryObj[category] = 1
      }
      
      // 记录每个分类的subType
      if (!subTypeMap[category]) {
        subTypeMap[category] = new Set()
      }
      if (subType) {
        subTypeMap[category].add(subType)
      }
    }
  })
  
  const list = []
  if (isIterable(categoryOptions)) {
    for (const c of categoryOptions) {
      const count = categoryObj[c.value]
      if (count) {
        // 将subType添加到返回结果中
        const subTypes = subTypeMap[c.value] ? Array.from(subTypeMap[c.value]) : []
        list.push({ 
          id: c.id, 
          name: c.value, 
          color: c.color, 
          count,
          subTypes
        })
      }
    }
  }

  // 按照数量排序
  // list.sort((a, b) => b.count - a.count)
  if (sliceCount && sliceCount > 0) {
    return list.slice(0, sliceCount)
  } else {
    return list
  }
}
