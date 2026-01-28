import ZAI from 'z-ai-web-dev-sdk'

// Hardcode API key directly - no config file lookups
const API_KEY = 'AIzaSyCPKy-h2rZ-v1DC9mK9sTUnYJ11ZisLwDg'

// ZAI client singleton
let zaiInstance: any = null

export async function getZAIInstance() {
  if (zaiInstance) {
    return zaiInstance
  }

  console.log('[ZAI Client] Initializing SDK with hardcoded API key...')
  console.log('[ZAI Client] API Key (first 10):', API_KEY.substring(0, 10) + '...')

  try {
    // Direct initialization with API key - bypass all config lookups
    zaiInstance = await ZAI.create({ apiKey: API_KEY })
    console.log('[ZAI Client] ✓ ZAI instance created successfully')
    return zaiInstance
  } catch (error) {
    console.error('[ZAI Client] Initialization failed:', error)
    throw new Error('Failed to initialize ZAI SDK: ' + (error instanceof Error ? error.message : String(error)))
  }
}

export async function performWebSearch(query: string, num: number = 10) {
  try {
    console.log('[ZAI Client] Performing web search for:', query)
    const zai = await getZAIInstance()

    const results = await zai.functions.invoke('web_search', {
      query: query.trim(),
      num
    })

    console.log('[ZAI Client] ✓ Web search completed, results:', Array.isArray(results) ? results.length : 0)
    return results
  } catch (error) {
    console.error('[ZAI Client] Web search error:', error)
    throw error
  }
}

export async function generateImage(prompt: string, size: string = '1024x1024') {
  try {
    console.log('[ZAI Client] Generating image with prompt:', prompt.substring(0, 50) + '...')
    const zai = await getZAIInstance()

    const response = await zai.images.generations.create({
      prompt: prompt,
      size
    })

    console.log('[ZAI Client] ✓ Image generation completed')
    return response
  } catch (error) {
    console.error('[ZAI Client] Image generation error:', error)
    throw error
  }
}
