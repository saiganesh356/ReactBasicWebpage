import {Link} from 'react-router-dom'
import {RiStarSFill} from 'react-icons/ri'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsItem = props => {
  const {eachItem} = props
  const {
    logoUrl,
    employment,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachItem
  return (
    <Link to={`/jobs/${id}`} className="link-job">
      <li className="listItems-job">
        <div className="logo-cont">
          <img
            src={logoUrl}
            className="logo-job"
            alt="similar job company logo"
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
          <div className="icons-loc-brief">
            <div className="icon-container-location">
              <MdLocationOn className="location-icon" />
              <p className="location-text">{location}</p>
            </div>
            <div className="icon-container-location">
              <BsFillBriefcaseFill className="location-icon" />
              <p className="location-text">{employment}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line-role" />
        <h1 className="description-job">Description</h1>
        <p className="description-matter">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsItem
