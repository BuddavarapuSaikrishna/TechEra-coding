import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import CourseView from '../CourseView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [status, SetStatus] = useState(apiStatusConstants.initial)
  const [courses, SetCourses] = useState([])

  const getCourses = async () => {
    SetStatus(apiStatusConstants.inProgress)
    const data = await fetch('https://apis.ccbp.in/te/courses')
    if (data.ok === true) {
      const responseData = await data.json()
      const UpdatedData = responseData.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))

      SetStatus(apiStatusConstants.success)
      SetCourses(UpdatedData)
    } else {
      SetStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  const renderSuccessView = () => (
    <div className="SuccessView-container">
      <h1>Courses</h1>
      <ul className="CourseList-container">
        {courses.map(each => (
          <CourseView CourseDetails={each} key={each.id} />
        ))}
      </ul>
    </div>
  )

  const Retry = () => {
    getCourses()
  }

  const renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seen to find the page your looking for</p>
      <button type="button" onClick={Retry}>
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="LoaderContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  const renderAll = () => {
    switch (status) {
      case apiStatusConstants.initial:
        return renderLoadingView()

      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()

      default:
        return null
    }
  }

  return <div className="Home-container">{renderAll()}</div>
}

export default Home
