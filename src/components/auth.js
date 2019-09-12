import React, { useState } from "react"

import "bulma/css/bulma.min.css"
import "./layout.css"

const Auth = ({ children }) => {
  const [isAuth, setAuth] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState(undefined)
  return isAuth ? (
    children
  ) : (
    <div className="container">
      <section className="section">
        <div className="card">
          <div className="card-content">
            <form
              onSubmit={e => handleLogin(e, setAuth, setLoading, setErrMsg)}
            >
              <div className="field">
                <label htmlFor="password" className="label is-large">
                  Mot de passe
                  <sub>(date de naissance de Félix JJMMAA)</sub>
                </label>

                <p className="control">
                  <input
                    name="password"
                    className="input is-large"
                    type="password"
                    placeholder="Password"
                    maxLength={6}
                    required
                  />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-success is-large">
                    {isLoading ? "loading..." : "Connexion"}
                  </button>
                </p>
              </div>
              {errMsg && <p>{errMsg}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

const handleLogin = (e, setAuth, setLoading, setErrMsg) => {
  e.preventDefault()
  setLoading(true)
  const password = e.target.elements[0].value
  fetch(process.env.GATSBY_AUTH_FN_URL, {
    method: "POST",
    body: JSON.stringify({
      password,
    }),
  })
    .then(r => r.json())
    .then(result => {
      setLoading(false)
      if (!result.error) {
        setAuth(true)
        return
      }
      setErrMsg(result.msg)
    })
}

export default Auth
