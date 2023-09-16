// import img from "../assets/eruchitanda.jpg"
import "../App.css";
import {formatISO9075} from 'date-fns';
import {Link} from 'react-router-dom'
const post = ({_id,title,summary,cover,content,createdAt}) => {
  return (
    <div>
        <div className="post">
        <div className="image">
          
          <Link to={`/post/${_id}`} >
            <img src={`http://localhost:4001/${cover}`} alt="image" />
            {/* <img src={`/uploads/${cover}`} alt="image" /> */}
          </Link>

          </div>
          <div className="texts">
            <Link to={`/post/${_id}`} >
              <h2>{title}</h2>
            </Link>
          <p className="info">
            {/* <span className="author">
              Karthik Nadar
            </span> */}
            <span className="time">
              {formatISO9075(new Date(createdAt))}
            </span>
          </p>
          <p className="summary" >{summary}</p>
          </div>
        </div>
    </div>
  )
}

export default post