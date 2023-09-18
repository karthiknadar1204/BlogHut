import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';

const PostPage = () => {
  const [postInfo, setPostInfo] = useState('');
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios.get(`http://localhost:4001/post/${id}`).then((response) => {
      setPostInfo(response.data); 
    });
  }, [id]);
  if(!postInfo){
    return '';
  }

  return (
    <div className='post-page'>
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))    }</time>
      <div className="edit-row">
        <Link className='edit-btn' to={`/edit/${postInfo._id}`}>Edit this post</Link>
      </div>
      <div className="image">
        {/* <img src={`http://localhost:4001/${postInfo.cover}`} alt="image" /> */}
        <img src={postInfo.cover} alt="image" />
      </div>
      <div className='content' dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  );
};

export default PostPage;
