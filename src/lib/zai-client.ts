import ZAI from 'z-ai-web-dev-sdk'

// ZAI client singleton
let zaiInstance: any = null

export async function getZAIInstance() {
  if (zaiInstance) {
    return zaiInstance
  }

  try {
    // Hardcode API key and try different option names
    const apiKey = 'AIzaSyCPKy-h2rZ-v1DC9mK9sTUnYJ11ZisLwDg'
    
    console.log('[ZAI Client] Attempting initialization with API key...')
    console.log('[ZAI Client] API Key (first 10 chars):', apiKey.substring(0, 10) + '...')
    console.log('[ZAI Client] Environment NODE_ENV:', process.env.NODE_ENV)
    
    // Try option name variations
    try {
      console.log('[ZAI Client] Trying option name: apiKey')
      zaiInstance = await ZAI.create({ apiKey })
      console.log('[ZAI Client] ✓ Success with "apiKey" option')
      return zaiInstance
    } catch (option1Error) {
      console.error('[ZAI Client] ✗ Failed with "apiKey" option:', option1Error)
      
      try {
        console.log('[ZAI Client] Trying option name: api_key')
        zaiInstance = await ZAI.create({ api_key: apiKey })
        console.log('[ZAI Client] ✓ Success with "api_key" option')
        return zaiInstance
      } catch (option2Error) {
        console.error('[ZAI Client] ✗ Failed with "api_key" option:', option2Error)
        
        try {
          console.log('[ZAI Client] Trying option name: key')
          zaiInstance = await ZAI.create({ key: apiKey })
          console.log('[ZAI Client] ✓ Success with "key" option')
          return zaiInstance
        } catch (option3Error) {
          console.error('[ZAI Client] ✗ Failed with "key" option:', option3Error)
          
          // Last resort - bare initialization
          console.log('[ZAI Client] Trying bare initialization (no config)')
          zaiInstance = await ZAI.create()
          console.log('[ZAI Client] ✓ Bare initialization succeeded')
          return zaiInstance
        }
      }
    }
  } catch (error) {
    console.error('[ZAI Client] All initialization methods failed:', error)
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
