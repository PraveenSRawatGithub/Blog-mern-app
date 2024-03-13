import React, { useState } from 'react'
import axios from 'axios'
import getCookie from '../Functions/getCookie';

export default function CreateBlog({ showBlogForm, setShowBlogForm, fetchBlogs }) {

    axios.defaults.withCredentials = true;

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [tag, setTag] = useState('')
    const [file, setFile] = useState(null)
    const [create, setCreate] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);

    const tags = {
        "tags": [
            "Technology",
            "Education",
            "Health & Wellness",
            "Lifestyle & Culture",
            "Travel & Adventure",
            "Food & Cooking",
            "Business & Finance",
            "Science & Innovation",
            "Arts & Entertainment"
        ]
    }

    const handleTag = (tag) => {
        if (selectedTag === tag) {
            setSelectedTag(null)
            setTag('')
        }
        else {
            setSelectedTag(tag);
            setTag(tag)
        }
    }

    const resetForm = () => {
        setTitle(''); setAuthor(''); setContent(''); setFile(null);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreate(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('content', content);
        formData.append('tag', tag);
        if (file) {
            formData.append('file', file);
        }
        // console.log('FormData:', formData.get('file'));

        let token = getCookie('jwt'); // Retrieve the token
        // console.log('cookie value is: ', token);
        if (token !== null) {
            try {

                const response = await axios.post('/createBlog', formData, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the request headers
                    }
                });

                setCreate(false)
                alert('Blog Created');
                resetForm();
                fetchBlogs(); // Fetch blogs again after creating a new one
            } catch (error) {
                alert('Error creating blog... Try again');
                console.error('Error creating blog:', error);
            }
        }
        setCreate(false);
        setShowBlogForm(false);
    };

    return (
        <>
            <div className=" p-4 h-fit bg-[#F8F8FF] text-center md:w-[90%] lg:w-[80%] xl:w-[70%]">

                {/* Create Blog Form  */}
                <div className="relative p-3  sm:p-6 rounded-xl m-1 sm:m-4 shadow-lg md:w-[100%] bg-white border-2 shadow-gray-400">
                    <button onClick={() => setShowBlogForm(false)} className="absolute top-0 right-0 mt-2 mr-2 p-3 rounded-full text-gray-600 hover:text-gray-800 hover:bg-gray-300">
                        <svg width="12" height="12" viewBox="0 0 100 100">
                            <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="2" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="2" />
                        </svg>
                    </button>

                    <h2 className="text-xl font-semibold mb-4 text-black">Create Blog</h2>
                    <div className="grid grid-cols-1 gap-2 sm:gap-4">
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Title" className="bg-gray-100 w-full px-4 py-2 rounded-lg border border-[#f3f2f2] focus:border-black focus:outline-none" required />
                        <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" name="author" placeholder="Author" className="bg-gray-100 w-full px-4 py-2 rounded-lg border border-[#f3f2f2] focus:border-black focus:outline-none" required />
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} name="content" rows="4" placeholder="Content" className="bg-gray-100 w-full px-4 py-2 rounded-lg border border-[#f3f2f2] focus:border-black focus:outline-none" style={{ overflowY: 'auto ' }} required></textarea>
                        <div className=' flex flex-wrap'>
                            <h1 className=' font-semibold'>Category: </h1>
                            {tags.tags.map(tag => (
                                <div onClick={() => handleTag(tag)} className={`text-xs md:text-sm  p-1 rounded-lg m-1 hover:cursor-pointer ${selectedTag === tag ? 'bg-blue-400' : 'bg-gray-200'}`} key={tag}>{tag}</div>
                            ))}
                        </div>
                        <div className='text-start ml-3'>
                            <span className='font-semibold '>Blog cover : </span>
                            <input onChange={handleFileChange} className='' type="file" accept='/image' />
                        </div>

                        <button onClick={handleSubmit} className="bg-[#212121] text-white px-4 py-2 rounded-md hover:bg-black focus:outline-none">{!create ? "Create Blog" : "Creating..."}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
