import { useEffect, useState } from 'react'
import { getPost } from '@/lib/notion/getNotionPost'
import { getPage,getPageWithRetry,convertNotionBlocksToPost } from '@/lib/notion/getPostBlocks'
import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'
import { defaultMapImageUrl } from 'react-notion-x'
import { compressImage, mapImgUrl } from '@/lib/notion/mapImage'

// 动态导入 NotionRenderer 组件
const NotionRenderer = dynamic(() => import('react-notion-x').then(mod => mod.NotionRenderer), { ssr: true })

/**
 * 将id映射成博文内部链接。
 * @param {*} id
 * @returns
 */
const mapPageUrl = id => {
    // return 'https://www.notion.so/' + id.replace(/-/g, '')
    return '/' + id.replace(/-/g, '')
  }
  
  /**
   * 缩放
   * @returns
   */
  function getMediumZoomMargin() {
    const width = window.innerWidth
  
    if (width < 500) {
      return 8
    } else if (width < 800) {
      return 20
    } else if (width < 1280) {
      return 30
    } else if (width < 1600) {
      return 40
    } else if (width < 1920) {
      return 48
    } else {
      return 72
    }
  }
  
  // 代码
  const Code = dynamic(
    () =>
      import('react-notion-x/build/third-party/code').then(async m => {
        return m.Code
      }),
    { ssr: false }
  )
  
  // 公式
  const Equation = dynamic(
    () =>
      import('@/components/Equation').then(async m => {
        // 化学方程式
        await import('@/lib/plugins/mhchem')
        return m.Equation
      }),
    { ssr: false }
  )
  
  // 原版文档
  // const Pdf = dynamic(
  //   () => import('react-notion-x/build/third-party/pdf').then(m => m.Pdf),
  //   {
  //     ssr: false
  //   }
  // )
  const Pdf = dynamic(() => import('@/components/Pdf').then(m => m.Pdf), {
    ssr: false
  })
  
  // 美化代码 from: https://github.com/txs
  const PrismMac = dynamic(() => import('@/components/PrismMac'), {
    ssr: false
  })
  
  /**
   * tweet嵌入
   */
  const TweetEmbed = dynamic(() => import('react-tweet-embed'), {
    ssr: false
  })
  
  /**
   * 文内google广告
   */
  const AdEmbed = dynamic(
    () => import('@/components/GoogleAdsense').then(m => m.AdEmbed),
    { ssr: true }
  )
  
//   const Collection = dynamic(
//     () =>
//       import('react-notion-x/build/third-party/collection').then(
//         m => m.Collection
//       ),
//     {
//       ssr: true
//     }
//   )
  
  const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then(m => m.Modal),
    { ssr: false }
  )
  
  const Tweet = ({ id }) => {
    return <TweetEmbed tweetId={id} />
  }
  

// // Define mapImgUrl function using defaultMapImageUrl
// const mapImgUrl = (url, block) => {
//   return defaultMapImageUrl(url, block)
// }

// This ensures the page is rendered on the server
export async function getServerSideProps() {
  try {
    // Test page ID
    const testPageId = '1eac6303e6c9813aabb4f1510c3eee5d'
    
    console.log('Testing getPage method...')
    const pageData = await getPage(testPageId, 'test-page')
    
    // 输出 collection 数据的前 200 行
    console.log('Page data collection 前 200 行:')
    if (pageData && pageData.collection) {
      const collectionStr = JSON.stringify(pageData.collection, null, 2)
      console.log(collectionStr.split('\n').slice(0, 200).join('\n'))
    } else {
      console.log('没有找到 collection 数据')
    }
    
    console.log('Testing getPost method...')
    const postData = await getPost(testPageId)
    
    const hasCollection = Object.values(pageData.block || {}).some(
        b => ['collection_view', 'collection_view_page'].includes(b.value?.type)
      )
    console.log('postData.blockMap 中是否包含 collection:', hasCollection)

    // Log structure information
    delete postData.blockMap.collection
    delete postData.blockMap.collection_view

    // 测试 getPageWithRetry 函数
    console.log('Testing getPageWithRetry method...')
    let retryResultKeys = [] // 初始化 retryResultKeys
    let convertKeys = [] // 初始化 convertKeys
    try {
      const retryResult = await getPageWithRetry(testPageId, 'test-page', 3)
      console.log('getPageWithRetry 测试成功:', {
        success: true,
        dataKeys: Object.keys(retryResult || {})
      })
      retryResultKeys = Object.keys(retryResult || {}) // 填充 retryResultKeys
      const  convertResult =  convertNotionBlocksToPost(testPageId, retryResult)
      convertKeys = Object.keys(convertResult || {}) // 填充 convertKeys
      postData.blockMap = convertResult
    } catch (error) {
      console.log('getPageWithRetry 测试失败:', {
        success: false,
        error: error.message
      })
    }
      

    
    console.log('Page data keys:', Object.keys(pageData || {}))
    console.log('Post data keys:', Object.keys(postData || {}))
    console.log('Post data blockMap keys:', Object.keys(postData?.blockMap || {}))
    console.log('Retry result keys:', retryResultKeys) // 添加日志输出
    console.log('Convert result keys:', convertKeys) // 添加日志输出
    // Return simplified data to avoid large JSON


    return {
      props: {
        success: true,
        pageDataKeys: Object.keys(pageData || {}),
        postDataKeys: Object.keys(postData || {}),
        retryResultKeys, // 将 retryResultKeys 添加到 props
        // 传递完整的 blockMap 数据用于渲染
        blockMap: postData?.blockMap || pageData,
        // Include sample data for inspection
        postSample: postData ? {
          id: postData.id,
          title: postData.title,
          type: postData.type,
          blockMapKeys: postData.blockMap ? Object.keys(postData.blockMap) : []
        } : null,
        // 添加 collection 数据的摘要
        collectionSummary: pageData && pageData.collection ? 
          `Collection 数据存在，包含 ${Object.keys(pageData.collection).length} 个键` : 
          '没有 collection 数据'
      }
    }
  } catch (error) {
    console.error('Error testing API:', error)
    return {
      props: {
        success: false,
        error: error.message
      }
    }
  }
}

export default function TestNotionAPI({ success, error, pageDataKeys, postDataKeys, postSample, collectionSummary, blockMap, retryResultKeys }) { // 添加 retryResultKeys 到 props
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Notion API 测试结果</h1>
      
      {!success && (
        <div className="bg-red-100 p-4 rounded mb-4">
          <p className="text-red-700">错误: {error}</p>
        </div>
      )}
      
      {success && (
        <div className="space-y-6">
          <div className="bg-green-100 p-4 rounded">
            <p className="text-green-700">测试成功完成！</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Collection 数据摘要</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {collectionSummary}
            </pre>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Page 数据结构</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(pageDataKeys, null, 2)}
            </pre>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Post 数据结构</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(postDataKeys, null, 2)}
            </pre>
          </div>
          
          {/* 新增：显示 getPageWithRetry 结果的结构 */}
          <div>
            <h2 className="text-xl font-semibold mb-2">getPageWithRetry 结果结构</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(retryResultKeys, null, 2)}
            </pre>
          </div>
          
          {postSample && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Post 示例</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(postSample, null, 2)}
              </pre>
            </div>
          )}
          
          {/* 添加 NotionRenderer 组件展示 */}
          {mounted && blockMap && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Notion 页面渲染预览</h2>
              <div className="notion-container border rounded p-4">
                <NotionRenderer
                  recordMap={blockMap}
                  mapPageUrl={mapPageUrl}
                  mapImageUrl={mapImgUrl}
                  components={{
                    Code,
                    Equation,
                    Modal,
                    Pdf,
                    Tweet
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      
      <p className="mt-6 text-gray-600">
        查看服务器控制台获取完整的数据结构日志。
      </p>
    </div>
  )
}