import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
// import axios from 'axios';

export default function UserNav(props) {

  let navigate = new useNavigate();

  const handleLogout = async() => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/');
  }
  return (
    <nav className="bg-[#011222] shadow-md shadow-[#011222] sticky top-0 z-10">
      <div className=" px-4">
        <div className="flex justify-between h-16">
          <div className='flex items-center'>
            <div className=" sm:items-center mx-4">
              {/* You can replace this text with your logo */}
              <span className="text-white font-semibold text-xl">Blogger</span>
            </div>
          </div>

          <div className='text-white flex items-center'>
            <Link to='/blogpost' className='text-white px-3 py-2 rounded-md text-md font-medium hover:bg-gray-700 mx-4'>Blogs</Link>
            <button >
              <Link to='/user' className=' flex justify-center items-center space-x-2 text-lg mr-2 md:ml-4 md:mr-8'>
                <img className='w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/3177/3177440.png' alt=''></img>
                <p className='hidden sm:flex text-white px-3 py-1 rounded-md text-md font-medium hover:bg-gray-700'> {props.username} </p>
              </Link>
            </button>
            <button onClick={handleLogout} className=' font-semibold rounded-md text-base bg-gray-700 hover:bg-gray-600 ml-1 mr-2 md:mr-3 px-2 py-1'>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
