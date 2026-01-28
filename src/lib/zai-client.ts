import ZAI from 'z-ai-web-dev-sdk'

// ZAI client singleton
let zaiInstance: any = null

export async function getZAIInstance() {
  if (zaiInstance) {
    return zaiInstance
  }

  // Check if API key is provided
  const apiKey = process.env.ZAI_API_KEY

  if (apiKey && apiKey.trim() !== '') {
    console.log('[ZAI Client] Using API key from environment variable')
    zaiInstance = await ZAI.create({ apiKey })
  } else {
    console.log('[ZAI Client] Using SDK default configuration')
    zaiInstance = await ZAI.create()
  }

  return zaiInstance
}

export async function performWebSearch(query: string, num: number = 10) {
  try {
    const zai = await getZAIInstance()

    const results = await zai.functions.invoke('web_search', {
      query: query.trim(),
      num
    })

    return results
  } catch (error) {
    console.error('[ZAI Client] Web search error:', error)
    throw error
  }
}

export async function generateImage(prompt: string, size: string = '1024x1024') {
  try {
    const zai = await getZAIInstance()

    const response = await zai.images.generations.create({
      prompt: prompt,
      size
    })

    return response
  } catch (error) {
    console.error('[ZAI Client] Image generation error:', error)
    throw error
  }
}
