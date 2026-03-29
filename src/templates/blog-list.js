import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogList = ({ data, pageContext, location }) => {
  const posts = data.allMarkdownRemark.nodes
  const { currentPage, numPages } = pageContext
  const fallback = getImage(data.file)
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <h1>記事一覧</h1>
      <ol className="post-list">
        {posts.map(post => {
          const image = post.frontmatter.thumbnail
            ? getImage(post.frontmatter.thumbnail)
            : fallback

          return (
            <Link to={post.fields.slug} key={post.fields.slug} className="card">
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
                    {/* <span className="tag-label">タグ：</span> */}
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

      {/* ページネーション */}
      <div className="pagination-wrapper">
        <div className="pagination">
          {currentPage > 1 && (
            <Link
              to={currentPage === 2 ? "/blog/" : `/blog/${currentPage - 1}`}
              className="page-btn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M15 18l-6-6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}

          {Array.from({ length: numPages }).map((_, i) => (
            <Link
              key={i}
              to={i === 0 ? "/blog/" : `/blog/${i + 1}`}
              className={`page-number ${i + 1 === currentPage ? "active" : ""}`}
            >
              {i + 1}
            </Link>
          ))}

          {currentPage < numPages && (
            <Link to={`/blog/${currentPage + 1}`} className="page-btn">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M9 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>

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
      </div>

      <Bio />
    </Layout>
  )
}

export default BlogList

export const Head = () => <Seo title="Blog" />

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          tags
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
