import * as React from "react"
import Header from "./header"
// import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const colors = ["#fc0000", "#ff9100", "#ffdd00", "#00ff00", "#0073ff"]

  return (
    <>
      <div className="bg-lines">
        {Array.from({ length: 150 }).map((_, i) => (
          <span
            key={i}
            style={{
              "--x": Math.random(),
              "--rot": `${180 + Math.random() * 540}deg`,
              "--sway": `${10 + Math.random() * 20}px`,
              height: `${30 + Math.random() * 50}px`,
              animationDuration: `${8 + Math.random() * 22}s`,
              animationDirection: Math.random() > 0.5 ? "normal" : "reverse",
              animationDelay: `${-Math.random() * 30}s`,
              background: colors[Math.floor(Math.random() * colors.length)],
              opacity: 0.1,
            }}
          />
        ))}
      </div>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <Header />
        <main>{children}</main>
        <footer className="copyright">
          COPYRIGHT © {new Date().getFullYear()}, SHIRAKEN ALL RIGHTS RESERVED.
        </footer>
      </div>
    </>
  )
}

export default Layout
