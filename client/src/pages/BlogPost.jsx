import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Spinner from '../Loaders/Spinner2';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const [spin, setSpin] = useState(true);
  const [category, setCategory] = useState('All');

  const tags = {
    "tags": [
      "All",
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

  axios.defaults.withCredentials = true;

  const handleCategory = (tag) => {
    if (category === tag) {
      setCategory('All')
    }
    else {
      setCategory(tag)
    }
  }

  const fetchBlogs = async () => {
    setSpin(true);
    try {
      const response = await axios.get(`https://blog-mern-app-mwd5.onrender.com/fetchBlogs/${category}`);
      setBlogs(response.data);
      setSpin(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  const handleLikes = async (blogid) => {
    try {
      console.log("likes starting")
      await axios.put(`/likes/${blogid}`);
      // Update the likes count for the specific blog in the state
      console.log("likes updated on bg")
      const updatedBlogs = blogs.map(blog => {
        if (blog._id === blogid) {
          // Create a new object with updated likes count
          return { ...blog, likes: blog.likes + 1 };
        }
        console.log("updating on client")
        return blog;
      });
      setBlogs(updatedBlogs);
      console.log(updatedBlogs)
    } catch (error) {
      console.error("error in likes: ", error);
    }
  }

  const navigateToBlog = (blog) => {
    navigate('/blog', {
      state: {blog, blogs, user: 0}
    });
  }

  return (
    <>
      <div className=' bg-[#F8F8FF]'>

        <Navbar></Navbar>
        <div className='bg-[#F8F8FF] flex overflow-x-scroll py-5 ml-4 sticky top-16'>
          <style>{`.overflow-x-scroll::-webkit-scrollbar {display: none; /* Hide the scrollbar */}`}</style>
          {tags.tags.map(tag => (
            <div onClick={() => { handleCategory(tag) }} key={tag} className={`py-1 px-2 rounded-lg mx-2 font-semibold inline-block whitespace-nowrap hover:cursor-pointer ${category === tag ? 'bg-[#212121] text-white' : 'bg-gray-300'}`}> {tag} </div>
          ))}
        </div>

        <div className="container mx-auto px-4 pt-4 bg-[#F8F8FF]">
          {/* <h1 className="text-3xl font-bold mb-4">All Blogs</h1> */}
          {spin && <Spinner></Spinner>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <div key={blog._id} className="border py-4 px-4 rounded-md bg-[#f5f4f4] shadow-md shadow-gray-400 ">
                <div className=' flex justify-center items-center mb-2'>
                  <img className='w-full' src={`https://blog-mern-app-mwd5.onrender.com/Images/${blog.image}`} alt=''></img>
                </div>
                <h2 className=" text-base sm:text-lg font-semibold mb-2">{blog.title}</h2>
                <div className='bg-gray-300 mb-2 h-[0.01rem] w-full'></div>
                <div className=' flex flex-wrap gap-1'>
                  <p className=" text-xs sm:text-base text-gray-600 mb-2"><span className='bg-gray-300 rounded-full px-3 py-1  text-sm font-semibold text-gray-500 sm:text-gray-600 mr-2'>{blog.author}</span></p>
                  <p className=" text-xs sm:text-base text-gray-600"><span className='bg-gray-300 rounded-full px-3 py-1  text-sm font-semibold text-gray-500 sm:text-gray-600 mr-2'> {blog.tag}</span></p>
                  <p className=" text-xs sm:text-base text-gray-600"><span className='bg-gray-300 rounded-full px-3 py-1  text-sm font-semibold text-gray-500 sm:text-gray-600 mr-2'> {new Date(blog.createdAt).toLocaleDateString()}</span></p>
                </div>
                <p className=" text-sm sm:text-base mt-2 mb-4 bg-[#eeebeb] rounded-lg p-2">{blog.content.split(" ").slice(0, 15).join(" ")}...</p>

                <div className=' flex justify-between items-center'>

                  <button onClick={() => { handleLikes(blog._id) }} className='flex gap-1 mx-3' >
                    <img className=' w-5 h-5' src="https://cdn-icons-png.flaticon.com/128/880/880605.png" alt="" />
                    <p> {blog.likes} </p>
                  </button>

                  <button onClick={() => { navigateToBlog(blog) }} className=" border-2 border-black hover:bg-[#212121] hover:text-white px-4 py-1  rounded-xl ">READ MORE</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
