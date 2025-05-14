import { useState } from 'react'
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'

const Submit = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Server',
    url: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState({ success: false, message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          parent: {
            database_id: '1dbc6303e6c980b89a85f1f7064587b6'
          },
          properties: {
            title: {
              title: [{ text: { content: formData.title } }]
            },
            type: {
              select: { name: formData.type }
            },
            url: {
              url: formData.url
            },
            status: {
              select: { name: '未开始' }
            }
          }
        })
      })

      if (!response.ok) {
        throw new Error('提交失败')
      }

      setSubmitResult({ success: true, message: '提交成功！' })
      setFormData({ title: '', type: 'Server', url: '' })
    } catch (error) {
      setSubmitResult({ success: false, message: '提交失败，请稍后重试' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-white dark:bg-[#1e1e1e]'>
      <div className='px-5 py-10 max-w-[86rem] mx-auto'>
        <h1 className='text-3xl text-center font-bold text-orange-500 mb-2'>提交 MCP 服务</h1>
        <p className='text-center text-gray-500 mb-8'>提交你的 MCP 服务信息</p>

        <div className='max-w-2xl mx-auto'>
          <form onSubmit={handleSubmit} className='space-y-6 bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-md'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                服务名称
              </label>
              <input
                type='text'
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className='w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
                placeholder='输入服务名称'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                类型
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className='w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
              >
                <option value='Server'>Server</option>
                <option value='Client'>Client</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                服务地址
              </label>
              <input
                type='url'
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className='w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
                placeholder='https://github.com/username/repository'
              />
            </div>

            {submitResult.message && (
              <div className={`p-3 rounded-md ${submitResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitResult.message}
              </div>
            )}

            <button
              type='submit'
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isSubmitting ? '提交中...' : '提交'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Submit