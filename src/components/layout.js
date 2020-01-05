/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

import { useStaticQuery, graphql } from "gatsby"

import "bulma/css/bulma.min.css"
import "./layout.css"

import Header from "./header"

import IdentityModal, {
  useIdentityContext,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CSS

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

  const [showLoginModal, setLoginModalVisibility] = useState(false)

  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn

  if (isLoggedIn) {
    return (
      <>
        <Helmet titleTemplate="Le Coin des Niaows - %s">
          <title> Accueil </title>{" "}
        </Helmet>{" "}
        <Header siteTitle={data.site.siteMetadata.title} /> {children}{" "}
        <footer className="footer">
          <div className="content has-text-centered">
            <p> ©{new Date().getFullYear()} </p>{" "}
          </div>{" "}
        </footer>{" "}
      </>
    )
  }
  return (
    <section className="section">
      <div className="container">
        <h1 className="title"> Bienvenue sur le Coin des Niaows! </h1>{" "}
        <p> pour accéder au site, vous devez vous connecter. </p> <br />
        <p>
          Si vous n 'avez pas encore créé de compte, cliquez sur le bouton "Se
          connecter " puis sur l'onglet " Sign up " afin de renseigner vos
          informations.Vous aurez ensuite besoin de confirmer votre création via
          le mail qui vous sera adressé.{" "}
        </p>{" "}
        <br />
        <button
          className="button is-primary is-large"
          onClick={() => setLoginModalVisibility(true)}
        >
          Se connecter / créer un compte{" "}
        </button>{" "}
        <IdentityModal
          showDialog={showLoginModal}
          onCloseDialog={() => setLoginModalVisibility(false)}
        />{" "}
      </div>{" "}
    </section>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
