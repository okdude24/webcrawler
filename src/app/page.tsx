'use client'

import { useState } from 'react'
import { Search, Globe, Clock, ExternalLink } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface SearchResult {
  url: string
  name: string
  snippet: string
  host_name: string
  rank: number
  date: string
  favicon?: string
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!query.trim()) return

    setLoading(true)
    setHasSearched(true)
    setResults([])

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.results) {
        setResults(data.results)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section - Search */}
        <section className="border-b bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-3">
                <span className="text-6xl md:text-7xl">🕷️</span>
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  خزنده وب
                </span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                جستجوی هوشمند در اینترنت
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="چه چیزی می‌خواهید جستجو کنید؟"
                  className="h-14 md:h-16 text-lg pr-14 pl-6 rounded-full border-2 focus:border-primary/50 shadow-lg"
                  dir="rtl"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                <Button
                  type="submit"
                  size="lg"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-12 px-8 rounded-full font-semibold"
                  disabled={loading}
                >
                  {loading ? 'در حال جستجو...' : 'جستجو'}
                </Button>
              </div>
            </form>

            {/* Quick Suggestions */}
            {!hasSearched && (
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-3">جستجوهای محبوب:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['هوش مصنوعی', 'تکنولوژی', 'برنامه‌نویسی', 'طراحی وب', 'اخبار فناوری'].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuery(suggestion)
                        handleSearch()
                      }}
                      className="rounded-full text-sm"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Search Results */}
        <section className="container mx-auto px-4 py-8 max-w-4xl">
          {loading && (
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">نتیجه‌ای یافت نشد</h3>
                <p className="text-muted-foreground">
                  لطفاً عبارت جستجوی خود را تغییر دهید و دوباره تلاش کنید.
                </p>
              </CardContent>
            </Card>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {results.length} نتیجه برای <span className="font-semibold text-foreground">"{query}"</span>
                </p>
              </div>

              {/* Results List */}
              <div className="space-y-4">
                {results.map((result, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-shadow duration-300 border hover:border-primary/30"
                  >
                    <CardContent className="p-5 md:p-6">
                      {/* URL and Favicon */}
                      <div className="flex items-center gap-2 mb-2">
                        {result.favicon && (
                          <img
                            src={result.favicon}
                            alt=""
                            className="w-4 h-4 rounded-sm opacity-70"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm text-muted-foreground truncate font-mono" dir="ltr">
                            {result.host_name}
                          </p>
                        </div>
                        {result.date && result.date !== 'N/A' && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{result.date}</span>
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-block mb-2"
                      >
                        <h3 className="text-lg md:text-xl font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                          {result.name}
                          <ExternalLink className="h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </h3>
                      </a>

                      {/* Snippet */}
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2">
                        {result.snippet}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto bg-muted/30">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <span>🕷️</span>
              <span>خزنده وب - موتور جستجوی هوشمند</span>
            </p>
            <div className="flex items-center gap-4">
              <span>خزشگر وب</span>
              <span>•</span>
              <span>اسکرپی</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
