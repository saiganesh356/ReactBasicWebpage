import {Component} from 'react'
import {FaExternalLinkAlt} from 'react-icons/fa'

import Cookies from 'js-cookie'
import {RiStarSFill} from 'react-icons/ri'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import JobItem from '../JobItem'
import RenderSkills from '../SkillsRoute'

import './index.css'

const jobDetailStatus = {
  success: 'SUCCESS',
  failure: 'Failure',
  loading: 'Isloading',
}

class JobDetailRoute extends Component {
  state = {
    status: jobDetailStatus.loading,
    similarRoles: [],
    SelecetedRole: {},
  }

  componentDidMount() {
    this.getJobDetailsJob()
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

  getJobDetailsJob = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')

    const option = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, option)
    const data = await response.json()

    if (response.ok === true) {
      const specificJobRole = data.job_details
      const lifeAtCompany = specificJobRole.life_at_company
      console.log(specificJobRole)
      const convertIntoCamelLife = {
        description: lifeAtCompany.description,
        imageUrlLife: lifeAtCompany.image_url,
      }
      const skillsArray = specificJobRole.skills
      const skillsCamel = skillsArray.map(each => ({
        name: each.name,
        skillUrl: each.image_url,
      }))

      const convertJobDetails = {
        logoUrl: specificJobRole.company_logo_url,
        employment: specificJobRole.employment_type,
        id: specificJobRole.id,
        jobDescription: specificJobRole.job_description,
        location: specificJobRole.location,
        packagePerAnnum: specificJobRole.package_per_annum,
        rating: specificJobRole.rating,
        title: specificJobRole.title,
        lifeAtCompanyDetails: convertIntoCamelLife,
        skills: skillsCamel,
        websiteUrl: specificJobRole.company_website_url,
      }
      const similarRoles = data.similar_jobs
      const convertedJobs = similarRoles.map(each =>
        this.converIntoCamelCase(each),
      )
      this.setState({
        status: jobDetailStatus.success,
        similarRoles: convertedJobs,
        SelecetedRole: convertJobDetails,
      })
    } else {
      this.setState({status: jobDetailStatus.failure})
    }
  }

  renderSkills = each => {
    const {name, skillUrl} = each

    return (
      <li className="skillsItem">
        <img src={skillUrl} className="skill-img" alt={name} />
        <p className="skill-text">{name}</p>
      </li>
    )
  }

  renderSuccessPage = () => {
    const {SelecetedRole, similarRoles} = this.state
    const {
      logoUrl,
      employment,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompanyDetails,
      skills,
      websiteUrl,
    } = SelecetedRole

    return (
      <div className="jobDetails-container">
        <div className="listItems-job-detail">
          <div className="logo-cont">
            <img
              src={logoUrl}
              className="logo-job"
              alt="job details company logo"
            />
            <div className="text-cont">
              <h1 className="title">{title}</h1>
              <div className="rating-cont">
                <RiStarSFill className="rating-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-header">
            <ul className="icons-loc-brief">
              <li className="icon-container-location">
                <MdLocationOn className="location-icon" />
                <p className="location-text">{location}</p>
              </li>
              <li className="icon-container-location">
                <BsFillBriefcaseFill className="location-icon" />
                <p className="location-text">{employment}</p>
              </li>
            </ul>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line-role" />
          <div className="location-header">
            <h1 className="description-job-detail">Description</h1>
            <a href={websiteUrl} className="anchor">
              Visit <FaExternalLinkAlt className="anchor-element" />
            </a>
          </div>
          <p className="description-matter">{jobDescription}</p>
          <h1 className="description-job-detail">Skills</h1>
          <ul className="skillList">
            {skills.map(eachItem => (
              <RenderSkills each={eachItem} key={eachItem.name} />
            ))}
          </ul>
          <h1 className="description-job-detail">Life at Company</h1>
          <div className="life-at-container">
            <p className="description-matter">
              {lifeAtCompanyDetails.description}
            </p>
            <img
              src={lifeAtCompanyDetails.imageUrlLife}
              className="life-img"
              alt="life at company"
            />
          </div>
        </div>

        <ul className="similarContainer">
          <div className="heading-text-similar">
            <h1 className="description-job-detail">Similar Jobs</h1>
          </div>
          {similarRoles.map(each => (
            <JobItem eachItem={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  Loading = () => (
    <div className="loader-container-jobDetails" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryForReload = () => {
    console.log('hii')
    this.setState({status: jobDetailStatus.loading}, () =>
      this.getJobDetailsJob(),
    )
  }

  failurePageDetails = () => (
    <div className="failure-page">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="heading-not">Oops! Something Went Wrong</h1>
      <p className="para-not">
        We cannot seem to find the page you are looking for
      </p>
      <button className="btn-retry" type="button" onClick={this.retryForReload}>
        Retry
      </button>
    </div>
  )

  renderResultDetail = status => {
    switch (status) {
      case jobDetailStatus.failure:
        return this.failurePageDetails()
      case jobDetailStatus.success:
        return this.renderSuccessPage()
      case jobDetailStatus.isLoading:
        return this.Loading()
      default:
        return this.Loading()
    }
  }

  render() {
    const {status} = this.state

    return (
      <>
        <Navbar />
        <div className="jonRole-main-page">
          {this.renderResultDetail(status)}
        </div>
      </>
    )
  }
}

export default JobDetailRoute
