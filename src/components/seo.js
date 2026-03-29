/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const metaTitle = title || defaultTitle
  const imageUrl = `${site.siteMetadata.siteUrl}${
    site.siteMetadata.pathPrefix || ""
  }${site.siteMetadata.image}`

  return (
    <>
      <title>
        {metaTitle === defaultTitle
          ? metaTitle
          : `${metaTitle} | ${defaultTitle}`}
      </title>
      <meta name="description" content={metaDescription} />

      <meta
        property="og:title"
        content={
          metaTitle === defaultTitle
            ? metaTitle
            : `${metaTitle} | ${defaultTitle}`
        }
      />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />

      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Seo
