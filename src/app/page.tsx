'use client'

import {googleSearch, GoogleSearchOutput} from "@/ai/flows/google-search-flow";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";

export default function Home() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GoogleSearchOutput>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setSearchResults([]);
    try {
      const results = await googleSearch(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">جستجوگر وب</h1>

      <div className="flex w-full max-w-md space-x-2">
        <Input
          type="text"
          placeholder="عبارت جستجوی خود را وارد کنید"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch} disabled={isLoading} className="bg-primary text-primary-foreground">
          جستجو
        </Button>
      </div>

      {isLoading && <p className="mt-4">در حال بارگذاری...</p>}

      <div className="mt-8 w-full max-w-md">
        {searchResults.map((result, index) => (
          <div key={index} className="mb-4 p-4 rounded-md shadow-sm animate-fade-in">
            <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-primary hover:underline">
              {result.title}
            </a>
            <p className="text-sm mt-1">{result.snippet}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        WebCrawler.ir
      </p>
    </div>
  );
}
