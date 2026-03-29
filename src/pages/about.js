import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || "Title"

  // const latestPosts = data.latest.nodes
  const recommendPosts = data.recommend.nodes
  const fallback = getImage(data.file)

  return (
    <Layout location={location} title={siteTitle}>
      <section className="home-section">
        <h2>プロフィール</h2>
        <ul className="profile-list">
          <li>
            <strong>氏名：</strong>白石 和暉（シライシ カズキ）
          </li>
          <li>
            <strong>出生：</strong>2001年9月生まれ（北九州）
          </li>
          <li>
            <strong>性格：</strong>心配性 / マイペース / 負けず嫌い
          </li>
        </ul>
      </section>
      <section className="home-section">
        <h2>経歴</h2>
        <ul className="timeline">
          <li>
            <span className="year">2014</span>
            <div className="content">北九州市立西小倉小学校 卒業</div>
          </li>
          <li>
            <span className="year">2017</span>
            <div className="content">北九州市立思永中学校 卒業</div>
          </li>
          <li>
            <span className="year">2022</span>
            <div className="content">北九州工業高等専門学校（情報） 卒業</div>
          </li>
          <li>
            <span className="year">2024</span>
            <div className="content">北九州工業高等専門学校専攻科 修了</div>
          </li>
          <li>
            <span className="year">2026</span>
            <div className="content">
              早稲田大学大学院情報生産システム研究科 修了
            </div>
          </li>
        </ul>
      </section>

      <section className="home-section">
        <h2>研究・活動紹介</h2>
        <h3>テーマ（1）：衛星画像 + 人工知能</h3>
        <p>
          「地表を観測した衛星画像」を解析するAIを提案します。
          具体的には、ピクセル単位で地物判別を行い、土地被覆分類マップというものを作ります。
          津波の浸水域や違法森林伐採の検知に応用できます。
          「複素数（位相情報）が欠落しない注意機構」に新規性があります。
        </p>
        <ol className="reference-list">
          <li>
            <cite>
              白石 和暉, 鎌田 清一郎,
              “複素型注意機構を用いたマルチバンドSAR画像の土地被覆分類”,
              IEICE2026年総合大会, 2026.
            </cite>
          </li>
          <li>
            <cite>
              Kazuki Shiraishi, Sei-Ichiro Kamata, "Land Cover Classification of
              Multi-band SAR Images Using Complex-Valued Attention Mechanism",
              GNW, 2026.
            </cite>
          </li>
          <li>
            <cite>
              Kazuki Shiraishi, Sei-Ichiro Kamata, "Land Cover Classification
              for Multi-Band SAR Using Complex-Valued Cross-Attention
              Mechanism", ISIPS, 2025.
            </cite>
          </li>
        </ol>
        <h3>テーマ（2）：無線通信 + 進化計算</h3>
        <p>
          既存の変調方式を上回る性能の変調モデルを提案します。
          PSKやQAMなどの規則的に配置された信号空間ダイヤグラムは、必ずしも最適な配置であるとはいえません。
          そこで本研究では、進化計算（GA、NEAT）を用いて、新しい信号空間ダイヤグラムを生成します。
          Society
          5.0を支える技術「高速・大容量」「低遅延」「多接続」に貢献します。
        </p>
        <ol className="reference-list">
          <li>
            <cite>
              白石 和暉, 才田 聡子,
              “進化アルゴリズムを用いた無線通信システムにおける信号空間ダイヤグラムの生成方法の提案”,
              特別研究公開発表会, 2024.
            </cite>
          </li>
          <li>
            <cite>
              白石 和暉, 福田 龍樹,
              “GAによる信号空間ダイヤグラム生成の可能性についての検討”,
              IEICE2022年総合大会, 2022.
            </cite>
          </li>
        </ol>
        <h3>テーマ（3）：料理研究</h3>
        <p>
          自炊のモチベーションを保つために、料理ブログを作りました。
          忙しい日でもサッと作れるレシピや、ちょっとした工夫で美味しくなるコツを紹介していきます。
        </p>
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
