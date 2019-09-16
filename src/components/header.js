import { Link, StaticQuery, graphql } from "gatsby"
import { decode } from "he"

import React from "react"

const query = graphql`
  query {
    allWordpressPage {
      edges {
        node {
          slug
          title
        }
      }
    }
  }
`

const Header = ({ siteTitle }) => (
  <StaticQuery
    query={query}
    render={data => (
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="/">{siteTitle}</Link>
          <button
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            {data.allWordpressPage.edges.map(({ node }) => (
              <Link className="navbar-item" to={node.slug}>
                {decode(node.title)}
              </Link>
            ))}
            <div className="navbar-item">
              <div className="buttons">
                <a
                  target="blank"
                  className="button is-primary"
                  href="//lecoinderd.cluster020.hosting.ovh.net/wp-admin"
                >
                  <strong>Connexion</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )}
  />
)

export default Header
