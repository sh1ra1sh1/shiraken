import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title

  // スクロール
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ダークモード
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setDark(true)
      document.body.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)

    if (next) {
      document.body.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-top">
        <h1 className="site-title">
          <Link to="/" className="site-brand">
            <StaticImage
              className="bio-avatar"
              layout="fixed"
              formats={["auto", "webp", "avif"]}
              src="../images/icon-512x512.png"
              width={44}
              height={44}
              quality={95}
              alt="logo"
            />
            <span>{siteTitle}</span>
          </Link>
        </h1>

        <div className="header-right">
          {/* ダークモード */}
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="テーマ切り替え"
          >
            {dark ? (
              /* 太陽 */
              <svg viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="23" />
                  <line x1="1" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="23" y2="12" />
                  <line x1="4.2" y1="4.2" x2="6.5" y2="6.5" />
                  <line x1="17.5" y1="17.5" x2="19.8" y2="19.8" />
                  <line x1="4.2" y1="19.8" x2="6.5" y2="17.5" />
                  <line x1="17.5" y1="6.5" x2="19.8" y2="4.2" />
                </g>
              </svg>
            ) : (
              /* 月 */
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          {/* ハンバーガー */}
          <button
            className={`hamburger ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="メニュー"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)} className="nav-item">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M3 10.5L12 3l9 7.5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M5 10v10h14V10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span>TOP</span>
        </Link>
        <Link to="/blog/" onClick={() => setIsOpen(false)} className="nav-item">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <rect
              x="4"
              y="3"
              width="16"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <line
              x1="8"
              y1="7"
              x2="16"
              y2="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="8"
              y1="11"
              x2="16"
              y2="11"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="8"
              y1="15"
              x2="13"
              y2="15"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>BLOG</span>
        </Link>
        <Link
          to="/about/"
          onClick={() => setIsOpen(false)}
          className="nav-item"
        >
          <svg viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M4 20c2-4 6-6 8-6s6 2 8 6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span>ABOUT</span>
        </Link>
        <Link
          to="/about/"
          onClick={() => setIsOpen(false)}
          className="nav-item"
        >
          <svg viewBox="0 0 24 24">
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M3 7l9 6 9-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span>CONTACT</span>
        </Link>
      </nav>
    </header>
  )
}

export default Header
