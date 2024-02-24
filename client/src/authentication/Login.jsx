import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';

import generateCookie from '../Functions/generateCookie';
import Spinner from '../Loaders/Spinner1';

export default function Login() {

  axios.defaults.withCredentials = true;

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [spin, setSpin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  const handleLogin = async () => {
    try {
      setSpin(true);
      let response = await axios.post('/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let token = response.data;

      generateCookie(token)

      setSpin(false);
      setIsLogin(true);
      // console.log('Server response is: ', response.data)
    }
    catch (error) {
      if (error.response.status === 404) {
        alert('User not found!')
      }
      else if (error.response.status === 401) {
        alert('Incorrect password!')
      }
      else {
        console.log('Server error: ', error);
      }
    }
  }

  if (isLogin) {
    return (
      <Navigate to="/user" replace />
      // eslint-disable-next-line
    )
  }

  else {
    return (
      <>
        <Navbar></Navbar>
        <div className=" relative top-20 flex justify-center items-center ">
          <div className=" px-6 sm:px-8 pt-3 sm:pt-4 pb-6 sm:pb-8 text-center border-2 border-gray-200 rounded-lg shadow-lg  w-[80%] md:w-[50%] lg:w-[35%]" >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">Log In</h2>
            <div className="space-y-4">
              <div>
                {/* <label htmlFor="email" className= "block mb-1">Email</label> */}
                <input name='email' onChange={handleChange} type="email" id="email" className="w-full py-2 text-black focus:outline-none border-b-[1px] border-gray-500 md:border-gray-600 mb-4" placeholder='Email' />
              </div>
              <div>
                {/* <label htmlFor="password" className= "block mb-1">Password</label> */}
                <input name='password' onChange={handleChange} type="password" id="password" className="w-full py-2 text-black focus:outline-none border-b-[1px] border-gray-500 md:border-gray-600 mb-4" placeholder='Password' />
              </div>
              <button onClick={handleLogin} className="w-full font-semibold text-white bg-blue-600  py-2 rounded-lg hover:bg-blue-700 focus:outline-none flex justify-center items-center">{ !spin ? "Log in" : <Spinner></Spinner> }</button>

            </div>
            <p className="mt-4 text-gray-600 ">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline block md:sm:inline">Sign up</Link></p>

          </div>
        </div>
      </>
    );
  }
};
