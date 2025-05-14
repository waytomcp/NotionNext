import { NextResponse } from 'next/server'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.NOTION_API_KEY) {
    console.error('NOTION_API_KEY is not configured')
    return res.status(500).json({ error: 'Notion API key is not configured' })
  }

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify(req.body)
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Notion API error:', errorData)
      throw new Error(`Notion API error: ${response.status}`)
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('Error submitting to Notion:', error)
    return res.status(500).json({ error: error.message || 'Failed to submit' })
  }
}