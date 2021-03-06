import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import VideoListItem from '../components/VideoListItem'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const videos = this.props.data.allYoutubeVideo.nodes
    const postLinks = posts.map((post) => {
      if (post.node.frontmatter.videoId && post.node.frontmatter.videoId.length) {
        const matchingVideo = videos.filter(videoPost => videoPost.videoId === post.node.frontmatter.videoId)[0];
        return(
          <VideoListItem data={matchingVideo} />
        )
      } else {
        return(
          <li key={post.node.fields.slug}>
            <Link to={post.node.fields.slug}>
              {post.node.frontmatter.featuredimage &&
                <PreviewCompatibleImage
                  imageInfo={{
                    image: post.node.frontmatter.featuredimage,
                    alt: `featured image thumbnail for post ${post.node.frontmatter.title}`,
                  }}
                />     
              }
              <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
            </Link>
          </li>
        )
      }
    })
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <Layout>
        <section className="section">
          <h1 className="page-title">{tagHeader}</h1>
          <ul className="tagged-posts">{postLinks}</ul>
          <div style={{textAlign: 'center'}}>
            <Link to="/tags/" className="button-primary">Browse all tags</Link>
          </div>
          <Helmet title={`${tag} | ${title}`} />
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            videoId
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 500, maxHeight: 281, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    allYoutubeVideo {
      nodes {
        id
        videoId
        title
        publishedAt
        localThumbnail {
          childImageSharp {
            fluid(maxWidth: 500, maxHeight: 281, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
