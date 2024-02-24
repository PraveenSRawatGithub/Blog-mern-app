import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserNav from './UserNav';
import Navbar from './Navbar';

const Blog = () => {
    const location = useLocation();
    
    const { blog, blogs, user} = location.state;
    const currentIndex = blogs.findIndex(item => item._id === blog._id);
    const nextIndex = (currentIndex + 1) % blogs.length;
    const nextBlog = blogs[nextIndex];

    const navigate = useNavigate();
    function navigateToNextBlog(nextBlog){
        navigate('/blog', {
            state: {blog: nextBlog, blogs}
        })
    }

    return (
        <>
        { user ? <UserNav username={blog.author}></UserNav> : <Navbar></Navbar>}
            <button onClick={() => {window.scrollTo({top:0, behavior: "smooth"}); window.history.back()}} className=' h-fit w-fit px-2 py-1 mx-4 my-4 bg-black hover:bg-[#302f2f] text-white text-sm font-semibold rounded-md fixed top-16 md:left-16'> {"<"} Back</button>
            <button onClick={() => {window.scrollTo({top:0, behavior: "smooth"}); navigateToNextBlog(nextBlog)}} className='h-fit w-fit px-2 py-1 mx-4 my-4 bg-black hover:bg-[#302f2f] text-white text-sm font-semibold rounded-md fixed top-16 right-0 md:right-16'>Next {" >"}</button>

            <div className=' bg-[#F8F8FF] flex justify-center  items-center mt-14 sm:mt-10 md:mt-2'>
                <div className=" bg-[#F8F8FF] shadow-md rounded-lg sm:m-8 text-center md:w-[80%] lg:w-[70%] xl:w-[60%]">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">{blog.title}</h2>
                    <div className=' flex justify-center items-center mb-2'>
                        <img className='w-[90%] h-60 md:w-[80%] md:h-80 xl:w-[70%] shadow-xl shadow-gray-200' src={`/Images/${blog.image}`} alt='' />
                    </div>
                    <div className="p-4">
                        <div className=' flex justify-between'>
                            <p className=" mb-4 text-sm text-gray-600 text-start">By {blog.author} on  {new Date(blog.createdAt).toLocaleDateString()} .</p>
                            <button className='flex gap-1 mx-3' >
                                <img className=' w-5 h-5' src="https://cdn-icons-png.flaticon.com/128/880/880605.png" alt="" />
                                <p> {blog.likes} </p>
                            </button>
                        </div>
                        <div className=' flex justify-start my-2'>
                            <p className=" text-xs sm:text-base text-gray-600"><span className='bg-gray-300 rounded-full px-3 py-1  text-sm font-semibold text-gray-500 sm:text-gray-600 mr-2'>{blog.tag}</span></p>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} className="sm:text-lg text-start" />
                    </div>
                </div>
            </div>

        </>
    );
};

export default Blog;
