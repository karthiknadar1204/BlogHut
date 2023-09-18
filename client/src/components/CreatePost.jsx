import { useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Editor from '../Editor';

const CreatePost = () => {
  const navigate = useNavigate(); 
  const [title, setTitle] = useState(''); 
  const [summary, setSummary] = useState(''); 
  const [content, setContent] = useState('');
  const [files,setFiles]=useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value); 
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value); 
  };

  // const modules = {
  //   toolbar: [
  //     [{ 'header': [1, 2, false] }],
  //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //     [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
  //     ['link', 'image'],
  //     ['clean'],
  //   ],
  // };

  // const formats = [
  //   'header',
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent',
  //   'link', 'image'
  // ];

  const createNewPost = async (ev) => {
    ev.preventDefault();
  
    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('file', files);
    
  
    try {
      const response = await axios.post('http://localhost:4001/post', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });   
      
      if (response.status === 200) {
        navigate('/');
      }


      console.log(await response.data);
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };
  
  

  return (
    <div>
      <form action="" onSubmit={createNewPost} encType="multipart/form-data" >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={handleSummaryChange}
        />
        <input type="file" onChange={e => setFiles(e.target.files[0])} />
        <Editor value={content} onChange={setContent} />
        {/* <ReactQuill value={content} onChange={newValue=>setContent(newValue)} modules={modules} formats={formats} /> */}
        <button style={{ marginTop: '5px' }}>Create post</button>
      </form>
    </div>
  );
};

export default CreatePost;
