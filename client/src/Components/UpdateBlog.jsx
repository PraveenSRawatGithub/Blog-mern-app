import React, { useState } from 'react'
import axios from 'axios'

export default function UpdateBlog({blog, setUpdate, fetchBlogs}) {
    const [blogId, setBlogId] = useState(blog._id)
    const [title, setTitle] = useState(blog.title)
    const [author, setAuthor] = useState(blog.author)
    const [content, setContent] = useState(blog.content.replace(/<br>/g, '\n'))

    const handleUpdate = async() => {
        
        try{
            let response = await axios.put(`https://blog-mern-app-mwd5.onrender.com/updateBlog/${blogId}`, {title, author, content})
            alert('blog updated successfully!')
            setUpdate(false);
            fetchBlogs();
            window.scrollTo({top: 0, behavior: "smooth"})
        }
        catch(error){
            alert('error updating Blog!')
        }
    }
    return (
        <>
            <div className="relative p-3  sm:p-6 rounded-xl m-1 sm:m-4 shadow-lg md:w-[70%] bg-white border-2 shadow-gray-400">
                <button onClick={() => {setUpdate(false)}} className="absolute top-0 right-0 mt-2 mr-2 p-3 rounded-full text-gray-600 hover:text-gray-800 hover:bg-gray-300">
                    <svg width="12" height="12" viewBox="0 0 100 100">
                        <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="2" />
                        <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="2" />
                    </svg>
                </button>

                <h2 className="text-xl font-bold mb-4 text-black text-center">Update Blog</h2>
                <div className="grid grid-cols-1 gap-2 sm:gap-4">
                    <input value={title} onChange={(e) => {setTitle(e.target.value)}}  type="text" name="title" placeholder="Title" className="bg-gray-200 w-full px-4 py-2 rounded-lg border border-[#f3f2f2] focus:border-black focus:outline-none" required />
                    <input value={author} onChange={(e) => {setAuthor(e.target.value)}}  type="text" name="author" placeholder="Author" className="bg-gray-200 w-full px-4 py-2 rounded-lg border border-[#f3f2f2] focus:border-black focus:outline-none" required />
                    <textarea value={content} onChange={(e) => {setContent(e.target.value)}} name="content" rows="4" placeholder="Content" className="bg-gray-200 h-80 w-full px-4 py-2 rounded-lg border border-[#f3f2f2] focus:border-black focus:outline-none" style={{ overflowY: 'auto ' }} required></textarea>
                    <button onClick={handleUpdate} className="bg-[#212121] text-white px-4 py-2 rounded-md hover:bg-black focus:outline-none">Update</button>
                </div>
            </div>
        </>
    )
}
