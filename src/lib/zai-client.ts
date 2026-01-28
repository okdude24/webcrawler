import ZAI from 'z-ai-web-dev-sdk'

// ZAI client singleton with hardcoded API key
let zaiInstance: any = null

export async function getZAIInstance() {
  if (zaiInstance) {
    return zaiInstance
  }

  try {
    // Hardcode API key directly - this is the most reliable method
    const apiKey = 'AIzaSyCPKy-h2rZ-v1DC9mK9sTUnYJ11ZisLwDg'

    console.log('[ZAI Client] Initializing with hardcoded API key...')
    zaiInstance = await ZAI.create({ apiKey })
    console.log('[ZAI Client] ZAI instance created successfully')

    return zaiInstance
  } catch (error) {
    console.error('[ZAI Client] Initialization failed:', error)
    throw new Error('Failed to initialize ZAI SDK')
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
