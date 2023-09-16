import { useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '../Editor';
import { useEffect } from 'react';



const EditPost = () => {
    const {id}=useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState(''); // Initialize title state with an empty string
    const [summary, setSummary] = useState(''); // Initialize summary state with an empty string
    const [content, setContent] = useState('');
    const [files,setFiles]=useState('');

    useEffect(() => {
        axios.get(`http://localhost:4001/post/${id}`)
            .then(response => {
                response.json().then(
                    postInfo => {
                        setTitle(postInfo.data.title);
                        setSummary(postInfo.data.summary);
                        setContent(postInfo.data.content);
                    }
                )
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [id]);
    
    

    // const modules = {
    //     toolbar: [
    //       [{ 'header': [1, 2, false] }],
    //       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    //       [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    //       ['link', 'image'],
    //       ['clean'],
    //     ],
    //   };
    
    //   const formats = [
    //     'header',
    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
    //     'list', 'bullet', 'indent',
    //     'link', 'image'
    //   ];

    const updatePost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', title);
        data.append('summary', summary);
        data.append('content', content);
        data.append('file', files);
        if (files) {
            data.set('file', files?.[0]);
        }
        try {
            const response=await axios.put(`http://localhost:4001/post`, data); // Use the correct endpoint and pass the data
            if(response.ok){
                // setRedirect(true)
            }
            // Redirect the user to a different page, e.g., the post detail page
            navigate(`/post-details/${id}`);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value); // Update the title state when the input changes
      };
    
      const handleSummaryChange = (e) => {
        setSummary(e.target.value); // Update the summary state when the input changes
      };
    
  return (
    <div>
      <form action="" onSubmit={updatePost} encType="multipart/form-data" >
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
        {/* <ReactQuill value={content} onChange={newValue=>setContent(newValue)} modules={modules} formats={formats} /> */}
        <Editor onChange={setContent} value={content} />
        <button style={{ marginTop: '5px' }}>Update post</button>
      </form>
    </div>
  )
}

export default EditPost