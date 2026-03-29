const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// テンプレート
const blogPost = path.resolve(`./src/templates/blog-post.js`)
const tagTemplate = path.resolve(`./src/templates/tag.js`)
const blogList = path.resolve(`./src/templates/blog-list.js`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            tags
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error loading posts`, result.errors)
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // ----------------------
  // タグ一覧を生成（追加）
  // ----------------------
  const tags = Array.from(
    new Set(posts.flatMap(post => post.frontmatter.tags || []))
  )

  // ----------------------
  // 記事ページ
  // ----------------------
  posts.forEach((post, index) => {
    const previousPostId =
      index === posts.length - 1 ? null : posts[index + 1].id
    const nextPostId = index === 0 ? null : posts[index - 1].id

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
      },
    })
  })

  // ----------------------
  // タグページ（ページネーション対応）
  // ----------------------
  const postsPerPage = 6

  tags.forEach(tag => {
    const taggedPosts = posts.filter(post =>
      post.frontmatter.tags?.includes(tag)
    )

    const numPages = Math.ceil(taggedPosts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/tags/${tag}` : `/tags/${tag}/${i + 1}`,
        component: tagTemplate,
        context: {
          tag,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  // ----------------------
  // ブログ一覧ページ（ページネーション）
  // ----------------------
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

// ----------------------
// slug生成
// ----------------------
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode })

    createNodeField({
      name: "slug",
      node,
      value: slug,
    })
  }
}

// ----------------------
// スキーマ定義
// ----------------------
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      date: Date @dateformat
      tags: [String]
      featured: Boolean
    }

    type Fields {
      slug: String
    }
  `)
}
