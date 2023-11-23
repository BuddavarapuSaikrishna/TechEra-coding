import './index.css'

const CourseDetailsItem = props => {
  const {CourseItemDetails} = props
  const {description, imageUrl, name} = CourseItemDetails
  console.log(description)

  return (
    <li className="course-details-list-items">
      <div className="Course-description-container">
        <img src={imageUrl} alt={name} />
        <div className="description-container">
          <h1>{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    </li>
  )
}

export default CourseDetailsItem
