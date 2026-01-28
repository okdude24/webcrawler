import { NextRequest, NextResponse } from 'next/server'
import { performWebSearch, generateImage } from '@/lib/zai-client'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const type = searchParams.get('type') || 'all'

  console.log('[API] Search request:', { query, type })

  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: 'Search query is required', results: [], images: [], news: [] },
      { status: 400 }
    )
  }

  try {
    // Handle different search types
    switch (type) {
      case 'images':
        return await handleImageSearch(query)

      case 'news':
        return await handleNewsSearch(query)

      case 'all':
      default:
        return await handleAllSearch(query)
    }
  } catch (error) {
    console.error('[API] Search error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('[API] Error message:', errorMessage)

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        debug: {
          query,
          type,
          errorDetails: error instanceof Error ? error.stack : String(error)
        },
        results: [],
        images: [],
        news: []
      },
      { status: 500 }
    )
  }
}

async function handleAllSearch(query: string) {
  console.log('[API] Performing web search for:', query)

  const results = await performWebSearch(query, 10)

  console.log('[API] Web search results count:', Array.isArray(results) ? results.length : 0)

  const transformedResults = Array.isArray(results) ? results.map((item: any) => ({
    url: item.url,
    name: item.name,
    snippet: item.snippet,
    host_name: item.host_name,
    rank: item.rank,
    date: item.date || 'N/A',
    favicon: item.favicon || null
  })) : []

  return NextResponse.json({
    success: true,
    query: query,
    type: 'all',
    results: transformedResults,
    total: transformedResults.length
  })
}

async function handleImageSearch(query: string) {
  console.log('[API] Performing image search for:', query)

  // Generate 4 images related to search query
  const imagePromises = []
  const numImages = 4

  // Clean query to be safer for image generation
  // Remove special characters but keep alphanumeric and common unicode ranges
  const cleanedQuery = query.replace(/[^\w\s\u4e00-\u9fa5\u0400-\u04FF\u0590-\u05FF\u0600-\u06FF]/g, '').trim()
  console.log('[API] Cleaned query for images:', cleanedQuery)

  for (let i = 0; i < numImages; i++) {
    // Create safe, professional prompts in English
    const safePrompts = [
      `Beautiful illustration of ${cleanedQuery}`,
      `Professional photo showing ${cleanedQuery}`,
      `Artistic representation of ${cleanedQuery}`,
      `Modern design featuring ${cleanedQuery}`
    ]

    imagePromises.push(
      generateImage(safePrompts[i])
        .catch((error: Error) => {
          console.error(`[API] Image generation ${i + 1} failed:`, error.message)
          return null
        })
    )
  }

  const imageResults = await Promise.all(imagePromises)

  const images = imageResults
    .filter((result: any) => result && result.data && result.data[0] && result.data[0].base64)
    .map((result: any, index: number) => ({
      url: '',
      base64: result.data[0].base64,
      prompt: `${query} - تصویر ${index + 1}`
    }))

  console.log('[API] Successfully generated images:', images.length)

  return NextResponse.json({
    success: true,
    query: query,
    type: 'images',
    images: images,
    total: images.length
  })
}

async function handleNewsSearch(query: string) {
  console.log('[API] Performing news search for:', query)

  // Add news-related keywords to search for recent news
  const newsQuery = `${query} news latest today breaking news اخبار جدید`
  console.log('[API] News query:', newsQuery)

  const results = await performWebSearch(newsQuery, 10)

  console.log('[API] News search results count:', Array.isArray(results) ? results.length : 0)

  const transformedResults = Array.isArray(results) ? results.map((item: any) => ({
    url: item.url,
    name: item.name,
    snippet: item.snippet,
    host_name: item.host_name,
    rank: item.rank,
    date: item.date || 'N/A',
    favicon: item.favicon || null
  })) : []

  return NextResponse.json({
    success: true,
    query: query,
    type: 'news',
    news: transformedResults,
    total: transformedResults.length
  })
}
