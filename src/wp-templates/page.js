import React from "react"
import { Helmet } from "react-helmet"

import { graphql } from "gatsby"

import Layout from "../components/layout"
import Auth from "../components/auth"

const PageTemplate = ({
  data: {
    wordpressPage: { title, content },
  },
}) => (
  <Layout>
    <Auth>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h1 className="title" dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Auth>
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
