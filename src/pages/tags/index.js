import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Tags | ${title}`} />
      <div className="content-container">
        <h1 className="page-title">Tags</h1>
        <ul className="tags-list">
          {group.map((tag) => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${tag.fieldValue.replace(/\s+/g, '-').toLowerCase()}/`} className={`tag-${tag.fieldValue.replace(/\s+/g, '-').toLowerCase()}`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </Layout>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
