/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

import { useStaticQuery, graphql } from "gatsby"

import { Provider } from "react-redux"
import store from "../store/store"

import "bulma/css/bulma.min.css"
import "./layout.css"

import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Provider store={store}>
      <Helmet titleTemplate="Le Coin des Niaows - %s">
        <title>Accueil</title>
      </Helmet>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="container">
        <section className="section">{children}</section>
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
