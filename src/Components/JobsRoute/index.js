import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import Profile from '../ProfileDirectory'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const statusMentions = {
  success: 'Success',
  failure: 'Failure',
  loading: 'IsLoading',
}

class JobsRoute extends Component {
  state = {
    typeOfEmployment: [],
    salaryRange: '',
    seareched: '',
    status: statusMentions.loading,
    jobsList: [],
  }

  componentDidMount() {
    this.getjobDetails()
  }

  converIntoCamelCase = each => ({
    logoUrl: each.company_logo_url,
    employment: each.employment_type,
    id: each.id,
    jobDescription: each.job_description,
    location: each.location,
    packagePerAnnum: each.package_per_annum,
    rating: each.rating,
    title: each.title,
  })

  getjobDetails = async () => {
    const {typeOfEmployment, salaryRange, seareched} = this.state
    const string = typeOfEmployment.join()

    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${string}&minimum_package=${salaryRange}&search=${seareched}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const converted = data.jobs.map(each => this.converIntoCamelCase(each))
      this.setState({jobsList: converted, status: statusMentions.success})
    } else {
      this.setState({status: statusMentions.failure})
    }
  }

  noJobRender = () => (
    <div className="failure-page">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="failure-img"
        alt="no jobs"
      />
      <h1 className="heading-not">No Jobs Found</h1>
      <p className="para-not">We could not find any jobs. Try other filters</p>
    </div>
  )

  renderJobsDetails = () => {
    const {jobsList} = this.state
    const list = (
      <ul className="list-roles">
        {jobsList.map(each => (
          <JobItem eachItem={each} key={each.id} />
        ))}
      </ul>
    )
    const result = jobsList.length === 0 ? this.noJobRender() : list

    return result
  }

  Loading = () => (
    <div className="loader-container-lg" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryForReload = () => {
    this.setState({status: statusMentions.loading}, () => this.getjobDetails())
  }

  failurePage = () => (
    <div className="failure-page">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="heading-not">Oops! Something went Wrong</h1>
      <p className="para-not">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="btn-retry" type="button" onClick={this.retryForReload}>
        Retry
      </button>
    </div>
  )

  getSearched = event => {
    this.setState({seareched: event.target.value})
  }

  applySearched = () => {
    this.setState({}, () => this.getjobDetails())
  }

  inputSearchElement = () => (
    <div className="search-cont">
      <input
        type="search"
        className="searchElement"
        placeholder="search"
        onChange={this.getSearched}
      />
      <div className="icon-cont">
        <button
          type="button"
          className="search-btn"
          data-testid="searchButton"
          onClick={this.applySearched}
        >
          <FaSearch />
          <p className="hide-txt">0</p>
        </button>
      </div>
    </div>
  )

  inputSearchElementLg = () => (
    <div className="search-cont-lg">
      <input
        type="search"
        className="searchElement"
        placeholder="search"
        onChange={this.getSearched}
      />
      <div className="icon-cont">
        <button
          type="button"
          className="search-btn"
          data-testid="searchButton"
          onClick={this.applySearched}
        >
          <FaSearch />
          <p className="hide-txt">0</p>
        </button>
      </div>
    </div>
  )

  getCheckBox = event => {
    const selected = event.target.value
    const {typeOfEmployment} = this.state
    const filteredList = typeOfEmployment.filter(each => each === selected)
    if (filteredList.length === 0) {
      this.setState(
        prevState => ({
          typeOfEmployment: [selected, ...prevState.typeOfEmployment],
        }),
        () => this.getjobDetails(),
      )
    } else {
      const remaining = typeOfEmployment.filter(each => each !== selected)
      this.setState({typeOfEmployment: remaining}, () => this.getjobDetails())
    }
  }

  checkBox = each => (
    <li className="checkbox-list" key={each.employmentTypeId}>
      <input
        type="checkbox"
        id={each.employmentTypeId}
        className="input-checkbox"
        onChange={this.getCheckBox}
        value={each.employmentTypeId}
      />
      <label htmlFor={each.employmentTypeId} className="label-element">
        {each.label}
      </label>
    </li>
  )

  getSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, () => this.getjobDetails())
  }

  radioElement = each => (
    <li className="checkbox-list" key={each.salaryRangeId}>
      <input
        type="radio"
        id={each.salaryRangeId}
        className="input-checkbox"
        value={each.salaryRangeId}
        onChange={this.getSalaryRange}
      />
      <label htmlFor={each.salaryRangeId} className="label-element">
        {each.label}
      </label>
    </li>
  )

  renderResultJobs = status => {
    switch (status) {
      case statusMentions.failure:
        return this.failurePage()
      case statusMentions.success:
        return this.renderJobsDetails()
      case statusMentions.isLoading:
        return this.Loading()
      default:
        return this.Loading()
    }
  }

  render() {
    const {typeOfEmployment, seareched, salaryRange, status} = this.state

    return (
      <>
        <Navbar />
        <div className="rolesPage">
          <div className="jobsPage">
            <div>
              {this.inputSearchElement()}
              <div className="profile-cont">
                <Profile />
              </div>
              <div className="line-cont">
                <hr className="hr-line" />
              </div>
              <div className="listItems">
                <h1 className="employment">Type of Employment</h1>
                <ul className="unorderedList">
                  {employmentTypesList.map(each => this.checkBox(each))}
                </ul>
              </div>
              <div className="line-cont">
                <hr className="hr-line" />
              </div>
              <div className="listItems">
                <h1 className="employment">Salary Range</h1>

                <ul className="unorderedList">
                  <form value={salaryRange}>
                    {salaryRangesList.map(each => this.radioElement(each))}
                  </form>
                </ul>
              </div>
            </div>
          </div>
          <div className="listOfJobs">
            <div className="input-cont">{this.inputSearchElementLg()}</div>
            {this.renderResultJobs(status)}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
