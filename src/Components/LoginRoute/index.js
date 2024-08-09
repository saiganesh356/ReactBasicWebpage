import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', errMsg: ''}

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'

    const loginData = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(loginData),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.setState({errMsg: data.error_msg})
    }
  }

  getUserName = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errMsg, username, password} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="LoginRoute">
        <div className="login-cont width-cont padding-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="img-logo"
            alt="website logo"
          />
          <form className="inputCont">
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <br />
            <input
              type="input"
              className="input-element"
              placeholder="Username"
              onChange={this.getUserName}
              id="username"
              value={username}
            />

            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              className="input-element"
              placeholder="Password"
              id="password"
              onChange={this.getPassword}
              value={password}
            />
            <button
              className="btn-primary"
              type="submit"
              onClick={this.submitForm}
            >
              Login
            </button>
            <p className="err">{errMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
