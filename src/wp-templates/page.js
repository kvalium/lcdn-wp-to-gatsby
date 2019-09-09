import React, { Component } from "react"
import { Helmet } from "react-helmet"

import { graphql } from "gatsby"

import Layout from "../components/layout"

class PageTemplate extends Component {
  render() {
    const currentPage = this.props.data.wordpressPage

    return (
      <Layout>
        <Helmet>
          <title>{currentPage.title}</title>
        </Helmet>
        <h1
          className="title"
          dangerouslySetInnerHTML={{ __html: currentPage.title }}
        />
        <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      date(formatString: "MMMM DD, YYYY")
    }
    site {
      id
      siteMetadata {
        title
      }
    }
  }
`
