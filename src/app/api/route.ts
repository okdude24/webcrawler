import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    )
  }

  try {
    const zai = await ZAI.create()

    const results = await zai.functions.invoke('web_search', {
      query: query.trim(),
      num: 10
    })

    // Transform results to match our interface
    // Remove any references to Google or external search providers
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
      results: transformedResults,
      total: transformedResults.length
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to perform search',
        results: []
      },
      { status: 500 }
    )
  }
}
