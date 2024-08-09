import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const statusObject = {
  failure: 'Failure',
  success: 'Success',
  isLoading: 'Loading',
}

class Profile extends Component {
  state = {status: statusObject.isLoading, userDetails: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'

    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileDetails = data.profile_details
      const convertedDetails = {
        imageUrl: profileDetails.profile_image_url,
        name: profileDetails.name,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        status: statusObject.success,
        userDetails: convertedDetails,
      })
    } else {
      this.setState({status: statusObject.failure})
    }
  }

  renderLoadedPage = () => {
    const {userDetails} = this.state
    const {imageUrl, name, shortBio} = userDetails

    return (
      <div className="details-user">
        <img src={imageUrl} alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  retryProfileDetails = () => {
    this.setState({status: statusObject.loading}, () =>
      this.getProfileDetails(),
    )
  }

  renderFailurePage = () => (
    <div className="retry-cont">
      <button
        className="btn-retry"
        type="button"
        onClick={this.retryProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  Loading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderResult = status => {
    switch (status) {
      case statusObject.failure:
        return this.renderFailurePage()
      case statusObject.success:
        return this.renderLoadedPage()
      case statusObject.isLoading:
        return this.Loading()
      default:
        return this.Loading()
    }
  }

  render() {
    const {status, userDetails} = this.state

    return this.renderResult(status)
  }
}

export default Profile
