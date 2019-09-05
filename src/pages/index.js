import React, { Component } from "react"
import { Link, graphql } from "gatsby"

class Home extends Component {
  render() {
    const data = this.props.data

    return (
      <>
        <div>
          <h1>Pages</h1>
          {data.allWordpressPage.edges.map(({ node }) => (
            <div key={node.slug}>
              <Link to={node.slug}>
                <h3>{node.title}</h3>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              <span>{node.date}</span>
            </div>
          ))}
        </div>
        <hr />
        <h1>Posts</h1>
        {data.allWordpressPost.edges.map(({ node }) => {
          console.log(node)
          return (
            <div key={node.slug}>
              <Link to={node.slug}>
                <h3>{node.title}</h3>
                {/* <img src={node.featured_img} alt={node.title} /> */}
              </Link>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </>
    )
  }
}

export default Home

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
    allWordpressPost(limit: 10) {
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
  }
`
