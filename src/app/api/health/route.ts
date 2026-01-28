import { NextResponse } from 'next/server'
import { getZAIInstance } from '@/lib/zai-client'

export async function GET() {
  try {
    console.log('[Health Check] Testing ZAI SDK initialization...')

    const zai = await getZAIInstance()

    return NextResponse.json({
      success: true,
      message: 'ZAI SDK initialized successfully',
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasApiKey: !!process.env.ZAI_API_KEY,
        apiKeyLength: process.env.ZAI_API_KEY?.length || 0
      }
    })
  } catch (error) {
    console.error('[Health Check] Failed:', error)

    return NextResponse.json({
      success: false,
      message: 'Failed to initialize ZAI SDK',
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasApiKey: !!process.env.ZAI_API_KEY
      }
    }, { status: 500 })
  }
}
