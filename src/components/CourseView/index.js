import {Link} from 'react-router-dom'
import './index.css'

const CoursesView = props => {
  const {CourseDetails} = props
  const {id, name, logoUrl} = CourseDetails

  return (
    <Link to={`/courses/${id}`}>
      <li className="course-list-items">
        <img className="course-logo" src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CoursesView
