import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const NavBar = props => {
  const clearCookies = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="navbar-lg hide-sm">
        <Link to="/" className="styling">
          <div className="img-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="logo"
              alt="website logo"
            />
          </div>
        </Link>
        <div className="route-cont-lg">
          <Link to="/" className="styling">
            <p className="route">Home</p>
          </Link>
          <Link to="/jobs" className="styling">
            <p className="route">Jobs</p>
          </Link>
        </div>
        <div className="button-cont">
          <Link to="/login">
            <button
              type="button"
              className="btn-logout-lg"
              onClick={clearCookies}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <div className="navbar-md hide-md">
        <div className="img-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo"
            alt="website logo"
          />
        </div>

        <ul className="button-cont">
          <Link to="/" className="styling">
            <li>
              <button type="button" className="btn-logout-md">
                <AiFillHome className="btn-md" />
                <p className="hide-txt">0</p>
              </button>
            </li>
          </Link>
          <Link to="/jobs" className="styling">
            <li>
              <button type="button" className="btn-logout-md">
                <BsFillBriefcaseFill className="btn-md" />
                <p className="hide-txt">0</p>
              </button>
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="btn-logout-md"
              onClick={clearCookies}
            >
              <FiLogOut className="btn-md" />
              <p className="hide-txt">0</p>
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default withRouter(NavBar)
