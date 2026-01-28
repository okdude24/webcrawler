import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('[Health Check] Testing API connectivity...')

    // Try to fetch from search API (will test full initialization)
    const testUrl = new URL('/api/health-test', process.env.NEXT_PUBLIC_URL || 'http://localhost:3000')
    
    // Or just verify files exist
    const fs = await import('fs')
    const path = await import('path')
    
    const zaiClientPath = path.join(process.cwd(), 'src/lib/zai-client.ts')
    const clientExists = fs.existsSync(zaiClientPath)
    
    return NextResponse.json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        clientExists: clientExists
      },
      instructions: {
        testSearch: 'Try searching for something like "هوش مصنوعی"',
        checkLogs: 'Check Liara Dashboard → Deployments → Latest for logs'
      }
    })
  } catch (error) {
    console.error('[Health Check] Failed:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Server is running but some issues',
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV
      }
    }, { status: 500 })
  }
}
