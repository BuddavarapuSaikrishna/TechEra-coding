import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import CourseDetailsItem from '../CourseDetailsItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

const CourseDetails = () => {
  const {id} = useParams()
  const [status, SetStatus] = useState(apiStatusConstants.initial)
  const [courseData, SetCourseData] = useState([])

  const getCourseDetails = async () => {
    SetStatus(apiStatusConstants.inProgress)

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok === true) {
      const responseData = await response.json()
      const UpdatedData = {
        id: responseData.course_details.id,
        name: responseData.course_details.name,
        description: responseData.course_details.description,
        imageUrl: responseData.course_details.image_url,
      }

      SetCourseData(UpdatedData)
      SetStatus(apiStatusConstants.success)
    } else {
      SetCourseData(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getCourseDetails()
    return () => {}
  }, [])

  const Retry = () => {
    getCourseDetails()
  }

  const renderSuccessView = () => (
    <div className="SuccessView-container">
      <ul className="CourseDetailsList-container">
        <CourseDetailsItem CourseItemDetails={courseData} />
      </ul>
    </div>
  )

  const renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure"
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

  return <div>{renderAll()}</div>
}

export default CourseDetails
