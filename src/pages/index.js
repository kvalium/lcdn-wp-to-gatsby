import React from "react"
import { Link, graphql } from "gatsby"
import { decode } from "he"

import Layout from "../components/layout"

export default function Index({ data }) {
  return (
    <Layout>
      <div>
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
      </div>
      <h2 className="subtitle">Articles</h2>
      <div className="columns is-multiline">
        {data.allWordpressPost.edges.map(({ node }) => {
          console.log(node.slug)
          return (
            <div className="column is-one-third" key={node.slug}>
              <Link to={node}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={node.featured_img} alt={node.title} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <h3 className="title is-4">{decode(node.title)}</h3>
                    <div className="content">
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
    allWordpressPost {
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
