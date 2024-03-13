import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UpdateBlog from './UpdateBlog';

export default function PreviousBlog({ blogs, fetchBlogs }) {
    axios.defaults.withCredentials = true;

    const [update, setUpdate] = useState(false);
    const [blogToUpdate, setBlogToUpdate] = useState();

    const navigate = useNavigate();
    const navigateToBlog = (blog) => {
        navigate('/blog', {
            state: { blog, blogs, user: 1 }
        });
    }

    const deleteBlog = async (id) => {
        const isDelete = window.confirm('Do you want to delete this blog...');
        if (isDelete) {
            try {
                await axios.delete(`https://blog-mern-app-mwd5.onrender.com/deleteBlog/${id}`);
                // console.log(response.data);
                alert('Blog deleted Successfully...');
                fetchBlogs();
            }
            catch (error) {
                alert('Error deleting blog.. Try again');
                console.error("Error deleting: ", error);
            }
        }
    }
    return (
        <>
            <div className=' p-2 sm:p-4 bg-[#F8F8FF]'>
                <div className=' lg:w-[100%]'>
                    <div className='text-center'>
                        <h2 className="text-lg m-4 font-semibold text-black bg-gray-200 rounded-lg shadow-xl shadow-gray-200 ">Previous Blogs</h2>
                    </div>
                    {blogs.length === 0 && <div className=' text-center'>Nothing to Show... Create Blogs</div>}
                    <div className="flex  flex-wrap justify-center items-center ">
                        {blogs.map(blog => (
                            <div key={blog._id} className="bg-white text-black px-4 sm:px-6 pb-4 pt-4 rounded-lg mb-4 shadow-md shadow-gray-400 w-full mx-4 md:w-80 lg:w-64 xl:w-96 my-3 md:mx-2">
                                <div className=' flex justify-center items-center mb-2'>
                                    <img className='w-full shadow-sm shadow-gray-400' src={`https://blog-mern-app-mwd5.onrender.com/Images/${blog.image}`} alt=''></img>
                                </div>
                                <h3 className="text-lg font-bold  mb-2">{blog.title}</h3>
                                <p className="text-gray-700 text-sm">{blog.content.split(" ").slice(0, 10).join(" ")}...</p>

                                <div className=' flex justify-between mt-4'>
                                    <div className='flex justify-center items-center'>
                                        <p className="text-gray-400"><span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                            {new Date(blog.createdAt).getDate()}{" "}
                                            {new Date(blog.createdAt).toLocaleString('en-US', { month: 'long' })}
                                        </span></p>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <button onClick={() => { navigateToBlog(blog) }} className='bg-white border-[1px] text-xs border-blue-600 px-2 rounded-lg m-2  text-blue-600 hover:bg-blue-600 hover:text-white'>READ</button>
                                        <button onClick={() => {
                                            setUpdate(true);
                                            setBlogToUpdate(blog);
                                            setTimeout(() => {
                                                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                                            }, 100); // Adjust the delay as needed
                                        }} className='bg-white border-[1px] text-xs border-green-600 px-2 rounded-lg m-2 text-green-600 hover:bg-green-600 hover:text-white'>
                                            UPDATE
                                        </button>
                                        <button onClick={() => { deleteBlog(blog._id) }}><img className='w-6 h-6 sm:w-7 sm:h-7' src="https://cdn-icons-png.flaticon.com/128/9790/9790368.png" alt="" /></button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className='md:flex md:justify-center md:items-center bg-[#F8F8FF] mt-10'>
                        {update && <UpdateBlog blog={blogToUpdate} setUpdate={setUpdate} fetchBlogs={fetchBlogs}></UpdateBlog>}
                    </div>
                </div>
            </div>
        </>
    )
}
