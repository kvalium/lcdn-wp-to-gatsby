import React from "react"
import { connect } from "react-redux"

import { handleLogin, checkAuth } from "../services/authService"
import { updateAuthStatus } from "../store/actions"

import "bulma/css/bulma.min.css"
import "./layout.css"

export class Auth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      errMsg: undefined,
    }
  }

  componentDidMount() {
    checkAuth().then(({ isAuth }) => {
      this.props.dispatch(updateAuthStatus(isAuth))
    })
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
    const { isAuth } = this.props
    if (isAuth) return this.props.children
    return (
      <div className="container">
        <section className="section">
          <div className="card">
            <div className="card-content">
              <form onSubmit={this.handleLogin}>
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
}

export default connect(({ isAuth }) => ({ isAuth: isAuth || false }))(Auth)
