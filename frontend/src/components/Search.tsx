import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cg64ot9n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

type Result = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function Search() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(query, 250)

  useEffect(() => {
    if (!debouncedQuery.trim()) { setResults([]); return }
    setLoading(true)
    const q = `*[_type == "post" && defined(publishedAt) && (
      title match $q + "*" || pt::text(body) match $q + "*"
    )] | order(publishedAt desc) [0...8] {
      _id, title, slug, excerpt, publishedAt
    }`
    client.fetch<Result[]>(q, { q: debouncedQuery }).then(res => {
      setResults(res)
      setActive(0)
    }).finally(() => setLoading(false))
  }, [debouncedQuery])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setResults([])
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (!open) return
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
      if (e.key === 'Enter' && results[active]) {
        window.location.href = `/writing/${results[active].slug.current}`
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, results, active, close])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <div className="absolute inset-0 bg-stone-900/30 dark:bg-stone-950/60 backdrop-blur-sm" onClick={close} />

          <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
            <div className="flex items-center gap-3 px-4 border-b border-stone-100 dark:border-stone-800">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 shrink-0">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search posts…"
                className="flex-1 py-4 text-sm bg-transparent outline-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600"
              />
              {loading && (
                <svg className="animate-spin text-stone-400 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              <kbd className="shrink-0 text-xs text-stone-400 dark:text-stone-600 border border-stone-200 dark:border-stone-700 rounded px-1.5 py-0.5">esc</kbd>
            </div>

            {results.length > 0 && (
              <ul className="py-2 max-h-80 overflow-y-auto">
                {results.map((r, i) => (
                  <li key={r._id}>
                    <a
                      href={`/writing/${r.slug.current}`}
                      className={`flex flex-col gap-0.5 px-4 py-3 transition-colors ${i === active ? 'bg-stone-50 dark:bg-stone-800' : 'hover:bg-stone-50 dark:hover:bg-stone-800'}`}
                      onMouseEnter={() => setActive(i)}
                    >
                      <span className="text-sm font-medium text-stone-900 dark:text-stone-100">{r.title}</span>
                      {r.excerpt && (
                        <span className="text-xs text-stone-400 dark:text-stone-500 line-clamp-1">{r.excerpt}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {query && !loading && results.length === 0 && (
              <p className="px-4 py-6 text-sm text-stone-400 dark:text-stone-600 text-center">No posts found for "{query}"</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
