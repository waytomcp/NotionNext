import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'

// 排名页面专用的 Notion 数据库 ID
const RANKING_DATABASE_ID = '1d5c6303e6c980579a29ec7459940abe'

/**
 * MCP 排名页面
 * @param {*} props
 * @returns
 */
const Ranking = props => {
  const { rankingData } = props

  if (!rankingData) {
    return (
      <div className='min-h-screen bg-white dark:bg-[#1e1e1e]'>
        <div className='px-5 py-10 max-w-[86rem] mx-auto min-h-screen'>
          <h1 className='text-3xl text-center font-bold text-orange-500 mb-2'>Call Ranking</h1>
          <p className='text-center text-gray-500 mb-8'>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white dark:bg-[#1e1e1e]'>
      <div className='px-5 py-10 max-w-[86rem] mx-auto'>
        <h1 className='text-3xl text-center font-bold text-orange-500 mb-2'>Call Ranking</h1>
        <p className='text-center text-gray-500 mb-8'>Top MCP Servers and Clients ranked by calls</p>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-10'>
          {/* Servers 列表 */}
          <div className='bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-md'>
            <h2 className='text-xl font-bold mb-4'>Servers</h2>
            <div className='space-y-4'>
              {rankingData?.servers?.map((item, index) => (
                <div key={index} className='flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg'>
                  <span className='text-lg font-bold w-8'>{index + 1}</span>
                  <img src={item.icon} alt={item.title} className='w-8 h-8 rounded-lg' />
                  <div className='flex-1'>
                    <h3 className='font-medium'>{item.title}</h3>
                    <p className='text-sm text-gray-500'>{item.summary}</p>
                  </div>
                  <span className='text-sm text-gray-500'>{item.views} calls</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clients 列表 */}
          <div className='bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-md'>
            <h2 className='text-xl font-bold mb-4'>Clients</h2>
            <div className='space-y-4'>
              {rankingData?.clients?.map((item, index) => (
                <div key={index} className='flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg'>
                  <span className='text-lg font-bold w-8'>{index + 1}</span>
                  <img src={item.icon} alt={item.title} className='w-8 h-8 rounded-lg' />
                  <div className='flex-1'>
                    <h3 className='font-medium'>{item.title}</h3>
                    <p className='text-sm text-gray-500'>{item.summary}</p>
                  </div>
                  <span className='text-sm text-gray-500'>{item.views} calls</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MCP 服务增长趋势图 */}
        <div className='w-full'>
          <h2 className='text-xl font-bold mb-4 text-center'>MCP服务增长趋势图</h2>
          <div className='w-full aspect-[16/9] rounded-xl overflow-hidden bg-white dark:bg-[#1e1e1e] shadow-md'>
            <iframe
              src="https://chartbase.so/embed/2de6116e-ed2e-43f2-9a69-eba353061533"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const from = 'ranking-page'
  const props = await getGlobalData({ from, locale })
  
  try {
    // Use fetch instead of notion-client
    const response = await fetch(`https://api.notion.com/v1/databases/${RANKING_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sorts: [
          {
            property: 'pv',
            direction: 'descending'
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Notion API responded with status ${response.status}`)
    }

    const data = await response.json()
    
    // Ensure data.results exists before mapping
    const rankingItems = (data.results || []).map(page => ({
      id: page.id,
      title: page.properties?.title?.title?.[0]?.plain_text || '',
      type: page.properties?.type?.select?.name || '',
      summary: page.properties?.summary?.rich_text?.[0]?.plain_text || '',
      logo: page.properties?.logo?.files?.[0]?.file?.url || '/favicon.ico',
      pv: parseInt(page.properties?.pv?.number || '0'),
      status: page.properties?.status?.select?.name || ''
    }))
    .filter(item => item.status !== '未开始')

    const servers = rankingItems
      .filter(item => item.type?.toLowerCase() === 'server')
      .map(({ title, summary, logo: icon, pv: views }) => ({
        title,
        summary,
        icon,
        views
      }))

    const clients = rankingItems
      .filter(item => item.type?.toLowerCase() === 'client')
      .map(({ title, summary, logo: icon, pv: views }) => ({
        title,
        summary,
        icon,
        views
      }))

    props.rankingData = { 
      servers: servers || [],
      clients: clients || []
    }
  } catch (error) {
    console.error('获取排名数据失败:', error)
    props.rankingData = {
      servers: [],
      clients: []
    }
  }

  // Add necessary page properties
  props.page = {
    title: 'Call Ranking',
    description: 'Top MCP Servers and Clients ranked by calls',
    type: 'Page',
    slug: '/cpage/ranking',  // 添加 slug 属性
    pageName: 'ranking'  // 添加 pageName 属性
  }

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



export default Ranking