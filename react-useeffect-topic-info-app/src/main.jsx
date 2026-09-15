import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [article, setArticle] = useState(null)
  const [status, setStatus] = useState('idle')

    const [time, setTime] = useState(() => new Date().toLocaleTimeString())

  // Keeps the clock updated every second.
  useEffect(() => {
    const updateClock = () => setTime(new Date().toLocaleTimeString())
    updateClock()
    const clock = setInterval(updateClock, 1000)
    return () => clearInterval(clock)
  }, [])
  
  // Runs whenever the user writes a new topic.
  useEffect(() => {
    const topic = inputText.trim()

    if (!topic) {
      setArticle(null)
      setStatus('idle')
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        setStatus('loading')
        // First search for the closest article, so the user does not need to
        // type the exact Wikipedia page title.
        const searchResponse = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(topic)}&srlimit=1&format=json&origin=*`,
          { signal: controller.signal },
        )

        if (!searchResponse.ok) throw new Error('Search failed')

        const searchData = await searchResponse.json()
        const firstResult = searchData.query?.search?.[0]
        if (!firstResult) throw new Error('Topic not found')

        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstResult.title)}`,
          { signal: controller.signal },
        )
        if (!response.ok) throw new Error('Topic not found')

        const data = await response.json()
        const shortInformation = (data.extract || '')
          .trim()
          .split(/\s+/)
          .slice(0, 50000)
          .join(' ')

        setArticle({
          title: data.title,
          description: data.description,
          extract: data.extract,
          url: data.content_urls?.desktop?.page,
          extract: shortInformation,
        })
        setStatus('success')
      } catch (error) {
        if (error.name !== 'AbortError') {
          setArticle(null)
          setStatus('error')
        }
      }
    }, 500)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [inputText])

  return (
    <main className="page">
      <section className="card" aria-labelledby="page-title">
        <p className="eyebrow">React state example</p>
        <h1 id="page-title">Search your topic</h1>
        <p className="intro">Type a topic, such as Python, to see information about it.</p>

        <label htmlFor="message">Write something</label>
        <textarea
          id="message"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          placeholder="For example: Python"
          rows="3"
        />

        <div className="output" aria-live="polite">
          <span className="output-label">Topic information</span>
          {status === 'idle' && <p>Information about your topic will appear here.</p>}
          {status === 'loading' && <p>Looking up information…</p>}
          {status === 'error' && <p>Sorry, no information was found for “{inputText}”.</p>}
          {status === 'success' && (
            <article>
              <h2>{article.title}</h2>
              {article.description && <p className="description">{article.description}</p>}
              <p>{article.extract}</p>
              <a href={article.url} target="_blank" rel="noreferrer">Read more on Wikipedia</a>
            </article>
          )}
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)