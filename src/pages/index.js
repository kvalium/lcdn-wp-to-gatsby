import React from "react"
import { Link, graphql } from "gatsby"
import { decode } from "he"

import Layout from "../components/layout"

export default function Index({ data }) {
  return (
    <Layout>
      {/* <div>
          <h2 className="subtitle">Pages</h2>
          {data.allWordpressPage.edges.map(({ node }) => (
            <div className="box" key={node.slug}>
              <Link to={node.slug}>
                <h3>{node.title}</h3>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              <span>{node.date}</span>
            </div>
          ))}
        </div> */}
      <h2 className="subtitle">Articles</h2>
      <div className="columns is-multiline">
        {data.allWordpressPost.edges.map(({ node }) => {
          return (
            <div className="column is-one-third" key={node.slug}>
              <Link to={node.slug}>
                <div className="card">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img src={node.featured_img} alt={node.title} />
                    </figure>
                  </div>
                  <div class="card-content">
                    <h3 className="title is-4">{decode(node.title)}</h3>
                    <div class="content">
                      <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

// Set here the ID of the home page.
export const pageQuery = graphql`
  query {
    allWordpressPage {
      edges {
        node {
          id
          slug
          title
          date
          excerpt
        }
      }
    }
    allWordpressPost(limit: 9) {
      edges {
        node {
          id
          slug
          title
          date(formatString: "DD MMMM YYYY", locale: "FR")
          featured_img
          excerpt
          author {
            name
          }
          categories {
            name
          }
        }
      }
    }
  }
`
