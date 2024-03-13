import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

import generateCookie from '../Functions/generateCookie';
import Spinner from '../Loaders/Spinner1';

export default function Signup() {

  axios.defaults.withCredentials = true;

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [spin, setSpin] = useState(false);

  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const createUser = async () => {
    // console.log(userData);
    try { 
      setSpin(true);
      let response = await axios.post('https://blog-mern-app-mwd5.onrender.com/signup', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let token = response.data;
      
      generateCookie(token);

      console.log("response from server is token: ", response.data);
      setSpin(false);
      setIsSignup(true);

    }
    catch (error) {
      console.error("error from server: ", error);
    }
  }

  if (isSignup) {
    return <Navigate to="/user" replace />; // Use Navigate component for redirection
    // eslint-disable-next-line
    <></>
  }
  else {
    return (
      <>
        <Navbar></Navbar>
        <div className=" relative top-20 bg-[#F8F8FF] flex justify-center items-center">
          <div className=" px-6 bg-white sm:px-8 pt-3 sm:pt-4 pb-6 sm:pb-8 border-2 text-center border-gray-200 rounded-lg shadow-lg w-[80%] md:w-[50%] lg:w-[35%] text-black" >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Signup</h2>
            <div className="space-y-4">
              <div>
                {/* <label htmlFor="name" className=" block mb-1">Name</label> */}
                <input onChange={handleChange} name='username' type="text" id="name" className=" mb-4 w-full  py-2  text-black focus:outline-none border-b-[1px] border-gray-500 md:border-gray-600" placeholder='Name' />
              </div>
              <div>
                {/* <label htmlFor="email" className=" block mb-1">Email</label> */}
                <input onChange={handleChange} name="email" type="email" id="email" className=" mb-4 w-full py-2 border-b-[1px] border-gray-500 md:border-gray-600 text-black focus:outline-none" placeholder='Email' />
              </div>
              <div>
                {/* <label htmlFor="password" className=" block mb-1">Password</label> */}
                <input onChange={handleChange} name='password' type="password" id="password" className=" mb-4 w-full py-2 border-b-[1px] border-gray-500 md:border-gray-600 text-black focus:outline-none" placeholder='Password' />
              </div>
              {/* <button onClick={createUser} className="w-full font-semibold text-white bg-blue-600  py-2 rounded-lg hover:bg-blue-700 focus:outline-none flex justify-center items-center">Sign Up</button> */}
              <button onClick={createUser} className="w-full font-semibold text-white bg-blue-600  py-2 rounded-lg hover:bg-blue-700 focus:outline-none flex justify-center items-center">{ !spin ? "Sign Up" : <Spinner></Spinner> }</button>
            </div>
            <p className="mt-4 text-gray-600">Already have an account? <Link to="/login" className="text-blue-500 hover:underline block sm:inline">Login</Link></p>
          </div>
        </div>
      </>
    );
  }
};
