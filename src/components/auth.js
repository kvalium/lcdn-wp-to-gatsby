import React from "react"
import { connect } from "react-redux"

import { handleLogin, checkAuth } from "../services/authService"
import { updateAuthStatus } from "../store/actions"

import "bulma/css/bulma.min.css"
import "./layout.css"

// import lcdnLogo from "../images/lcdn-icon.png"

export class Auth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      errMsg: undefined,
    }
  }

  componentDidMount() {
    if (!this.props.isAuth) {
      checkAuth().then(({ isAuth }) => {
        this.props.dispatch(updateAuthStatus(isAuth))
      })
    }
  }

  handleLogin = e => {
    this.setState({ isLoading: true })
    e.preventDefault()
    const password = e.target.elements[0].value
    handleLogin(password).then(r => {
      this.setState({
        errMsg: (r.error && r.msg) || undefined,
        isLoading: false,
      })
      !r.error && this.props.dispatch(updateAuthStatus(true))
    })
  }

  render() {
    const { isLoading, errMsg } = this.state
    const { isAuth, children } = this.props
    if (isAuth) return children
    return (
      <div className="login-page">
        <section className="section login">
          <div className="login-header has-text-centered">
            <h1 className="title is-h1">
              Bienvenue sur
              <br />
              <span class="site-name">le Coin des Niaows !</span>
            </h1>
          </div>
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.handleLogin}>
                    <div className="field">
                      <label htmlFor="password" className="label">
                        <h2 className="title is-h2">Mot de passe</h2>
                      </label>
                      <div
                        className={`control is-large${
                          isLoading ? " is-loading" : ""
                        }`}
                      >
                        <input
                          name="password"
                          className={`input is-large${
                            errMsg ? " is-danger" : ""
                          }`}
                          type="password"
                          placeholder="mot de passe"
                          maxLength={6}
                          size={6}
                          required
                        />
                      </div>
                    </div>
                    {errMsg && <p className="tag is-warning">{errMsg}</p>}
                    <div className="field">
                      <p className="control">
                        <button
                          className="button is-success is-large"
                          disabled={isLoading}
                        >
                          Connexion
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default connect(({ isAuth }) => ({ isAuth: isAuth || false }))(Auth)
