import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserNav from '../Components/UserNav';
import Navbar from '../Components/Navbar';
import Spinner from '../Loaders/Spinner2'

import getCookie from '../Functions/getCookie';
import CreateBlog from '../Components/CreateBlog';
import PreviousBlog from '../Components/PreviousBlog';


export default function User() {
 
    axios.defaults.withCredentials = true;

    const [user, setUser] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const [showBlogForm, setShowBlogForm] = useState(false); // State variable to manage visibility of the blog form

    const [spin, setSpin] = useState(true);
    const [isUser, setIsUser] = useState(false);

    const fetchBlogs = useCallback(async () => {
        let token = getCookie('jwt');
        // console.log('cookie value is: ', token);
        if (token !== null) {
            try {
                const response = await axios.get('https://blog-mern-app-mwd5.onrender.com/fetchUserBlog', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the request headers
                    }
                });
                if (response.status === 401) {
                    setSpin(false)
                    setIsUser(false);
                }
                setSpin(false)
                setIsUser(true);
                setBlogs(response.data.blogs);
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching blogs: ", error);
            }
        }
        else {
            setSpin(false)
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]); // Fetch blogs only once when component mounts

    return (
        <>
            {spin ? (
                <>
                    <Navbar></Navbar>
                    <div className=' mt-16'>
                        <Spinner></Spinner>
                    </div>
                </>
            ) : (
                !isUser ? (<div>
                    <Navbar />
                    <div className="flex flex-col items-center justify-center">
                        <div className="mt-8 text-center">
                            <p className="text-2xl text-gray-700 mb-4">To create blogs, first</p>
                            <div className="flex justify-center">
                                <Link to="/login" className="text-blue-500 underline mr-4 text-lg">Login</Link>
                                <span className="text-gray-500 text-lg">or</span>
                                <Link to="/signup" className="text-blue-500 underline ml-4 text-lg">Signup</Link>
                            </div>
                        </div>
                    </div>
                </div>) : (
                    <div className=' bg-[#F8F8FF]'>
                        <UserNav username={user.username}></UserNav>
                        <div className=' flex justify-between my-4 mx-2'>
                            <h1 className=" text-md sm:text-lg md:text-xl font-bold mx-4 text-black">
                                Welcome, <span className=' text-xl sm:text-2xl md:text-3xl'> {user.username} </span>
                            </h1>
                            <button className=' text-md text-white font-bold p-1 sm:px-3 sm:py-1 md:py-1 bg-black hover:bg-[#212121] active:bg-[#4b4a4a] rounded-full sm:rounded-md mx-4 h-fit fixed top-20 right-2' onClick={() => {window.scrollTo({top:0, behavior: "smooth"}); setShowBlogForm(true)}}><span className='hidden sm:inline'>Create</span>
                                <svg className=' inline md:ml-1'
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg></button>
                        </div>

                        <div className=' flex justify-center items-center bg-[#F8F8FF]'>
                            {showBlogForm && ( // Only show the blog form if showBlogForm is true
                                <CreateBlog showBlogForm={showBlogForm} setShowBlogForm={setShowBlogForm} fetchBlogs={fetchBlogs}></CreateBlog>
                            )}
                        </div>


                        {/* User's Previous Blogs */}
                        <PreviousBlog blogs={blogs} fetchBlogs={fetchBlogs}></PreviousBlog>

                    </div>
                )
            )
            }
        </>
    );
}