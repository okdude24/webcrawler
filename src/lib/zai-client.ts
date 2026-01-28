import ZAI from 'z-ai-web-dev-sdk'

// ZAI client singleton
let zaiInstance: any = null
let initializationError: Error | null = null

export async function getZAIInstance() {
  if (zaiInstance) {
    return zaiInstance
  }

  if (initializationError) {
    console.error('[ZAI Client] Previous initialization failed:', initializationError)
    throw initializationError
  }

  try {
    const apiKey = process.env.ZAI_API_KEY
    console.log('[ZAI Client] Environment check:', {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey?.length || 0,
      envNodeEnv: process.env.NODE_ENV
    })

    if (apiKey && apiKey.trim() !== '') {
      console.log('[ZAI Client] Using API key from environment variable')
      console.log('[ZAI Client] API key (first 10 chars):', apiKey.substring(0, 10) + '...')
      zaiInstance = await ZAI.create({ apiKey })
    } else {
      console.log('[ZAI Client] No API key found, using SDK default configuration')
      zaiInstance = await ZAI.create()
    }

    console.log('[ZAI Client] ZAI instance created successfully')
    return zaiInstance
  } catch (error) {
    console.error('[ZAI Client] Initialization failed:', error)
    initializationError = error instanceof Error ? error : new Error(String(error))
    throw initializationError
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

    console.log('[ZAI Client] Web search completed, results:', Array.isArray(results) ? results.length : 'not an array')
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

    console.log('[ZAI Client] Image generation completed')
    return response
  } catch (error) {
    console.error('[ZAI Client] Image generation error:', error)
    throw error
  }
}
