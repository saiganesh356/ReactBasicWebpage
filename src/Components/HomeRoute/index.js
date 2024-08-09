import {Link} from 'react-router-dom'
import {Component} from 'react'

import Navbar from '../Navbar'

import './index.css'

class HomeRoute extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="home-page-sm">
          <div className="text-cont">
            <h1 className="heading">Find The job That Fits your Life</h1>
            <p className="description">
              Millions of people are searching for jobs,salary
              information,company reviews.Find the job that fits your abilities
              and potential
            </p>
            <Link to="/jobs">
              <button type="button" className="btn-jobs">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default HomeRoute
