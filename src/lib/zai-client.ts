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
      envNodeEnv: process.env.NODE_ENV,
      allEnvKeys: Object.keys(process.env).filter(k => k.includes('ZAI'))
    })

    // Try multiple initialization methods
    try {
      if (apiKey && apiKey.trim() !== '') {
        console.log('[ZAI Client] Method 1: Using API key from environment')
        console.log('[ZAI Client] API Key (first 10):', apiKey.substring(0, 10) + '...')
        zaiInstance = await ZAI.create({ apiKey })
      } else {
        console.log('[ZAI Client] Method 2: Using SDK default configuration')
        zaiInstance = await ZAI.create()
      }
    } catch (method1Error) {
      console.error('[ZAI Client] Method 1 failed, trying Method 2:', method1Error)
      
      // Try with explicit empty config
      try {
        console.log('[ZAI Client] Method 2: Trying with explicit config')
        zaiInstance = await ZAI.create({
          apiKey: apiKey || undefined,
          configPath: undefined
        })
      } catch (method2Error) {
        console.error('[ZAI Client] Method 2 failed, trying Method 3:', method2Error)
        
        // Final attempt - bare initialization
        console.log('[ZAI Client] Method 3: Bare initialization')
        zaiInstance = await ZAI.create()
      }
    }

    console.log('[ZAI Client] ZAI instance created successfully')
    return zaiInstance
  } catch (error) {
    console.error('[ZAI Client] All initialization methods failed:', error)
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
