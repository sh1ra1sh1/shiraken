import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/bio"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || "Title"

  const latestPosts = data.latest.nodes
  const recommendPosts = data.recommend.nodes
  const fallback = getImage(data.file)

  return (
    <Layout location={location} title={siteTitle}>
      {/* =====================
          あいさつ
      ===================== */}
      <section className="home-section">
        <h1>ようこそ！</h1>
        <p>
          簡単でおいしい料理を紹介するブログです。 <br />
          忙しい日でも作れるレシピや、ちょっとしたコツを発信しています。 <br />
          投稿内容は個人の見解であり、所属とは一切関係ありません。 <br />
          広告収入等の収益は一切ありません。
        </p>
      </section>

      {/* =====================
          ニュース
      ===================== */}
      <section className="home-section">
        <h2>ニュース</h2>
        <ul className="news-list">
          <li>（2026/03/22） ダークモードに対応しました。</li>
          <li>（2026/03/21） タグ検索機能を追加しました。</li>
          <li>（2026/03/19） サイトをリニューアルしました！</li>
        </ul>
      </section>

      {/* =====================
          おすすめ記事
      ===================== */}
      <section className="home-section">
        <h2>おすすめ記事</h2>

        <ol className="post-list">
          {recommendPosts.map(post => {
            const image = post.frontmatter.thumbnail
              ? getImage(post.frontmatter.thumbnail)
              : fallback

            return (
              <Link
                to={post.fields.slug}
                key={post.fields.slug}
                className="card"
              >
                <article>
                  {image && (
                    <GatsbyImage
                      image={image}
                      alt={post.frontmatter.title}
                      className="card-image"
                    />
                  )}

                  <div className="card-content">
                    <h2>{post.frontmatter.title}</h2>

                    <div className="tags">
                      {post.frontmatter.tags?.map(tag => (
                        <Link
                          to={`/tags/${tag}`}
                          key={tag}
                          className="tag"
                          onClick={e => e.stopPropagation()}
                        >
                          # {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </ol>

        <div className="more-link">
          <Link to="/blog/">→ もっと見る</Link>
        </div>
      </section>

      {/* =====================
          最新記事
      ===================== */}
      <section className="home-section">
        <h2>最新記事</h2>

        <ol className="post-list">
          {latestPosts.map(post => {
            const image = post.frontmatter.thumbnail
              ? getImage(post.frontmatter.thumbnail)
              : fallback

            return (
              <Link
                to={post.fields.slug}
                key={post.fields.slug}
                className="card"
              >
                <article>
                  {image && (
                    <GatsbyImage
                      image={image}
                      alt={post.frontmatter.title}
                      className="card-image"
                    />
                  )}

                  <div className="card-content">
                    <h2>{post.frontmatter.title}</h2>

                    <div className="tags">
                      {post.frontmatter.tags?.map(tag => (
                        <Link
                          to={`/tags/${tag}`}
                          key={tag}
                          className="tag"
                          onClick={e => e.stopPropagation()}
                        >
                          # {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </ol>

        <div className="more-link">
          <Link to="/blog/">→ もっと見る</Link>
        </div>
      </section>

      {/* TOPボタン */}
      <button
        className="to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="トップ"
      >
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            d="M6 15l6-6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* =====================
          Bio
      ===================== */}
      <Bio />
    </Layout>
  )
}

export default IndexPage

export const Head = () => <Seo title="Home" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    # 最新記事（2件）
    latest: allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 2) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 400, aspectRatio: 1.6)
            }
          }
        }
      }
    }

    # おすすめ記事（2件）
    recommend: allMarkdownRemark(
      filter: { frontmatter: { featured: { eq: true } } }
      limit: 2
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 400, aspectRatio: 1.6)
            }
          }
        }
      }
    }

    file(relativePath: { eq: "default.png" }) {
      childImageSharp {
        gatsbyImageData(width: 400, aspectRatio: 1.6)
      }
    }
  }
`
