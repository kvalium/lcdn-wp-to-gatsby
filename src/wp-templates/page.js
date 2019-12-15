import React from "react"
import { Helmet } from "react-helmet"

import { graphql } from "gatsby"

import Layout from "../components/layout"

const PageTemplate = ({
  data: {
    wordpressPage: { title, content },
  },
}) => (
  <Layout>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <section className="section">
      <div className="container">
        <h1 className="title" dangerouslySetInnerHTML={{ __html: title }} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  </Layout>
)

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
