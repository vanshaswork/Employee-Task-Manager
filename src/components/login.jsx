import React from 'react'
import { useState } from 'react';

const Login = ({handleLogin}) => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = () => {
      setForm(form)
        handleLogin(form.email, form.password);
        setForm({ email: '', password: '' }); 
    }

    const handleChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value });

    }
   

    return (
        <div className='flex justify-center items-center h-screen w-screen bg-gray-200'>
            <div className="loginBox h-[300px] w-[400px]  flex flex-col  bg-white rounded-lg shadow-lg">
                <div className="heading h-[60px] w-full flex justify-center items-end text-xl font-bold ">Login Here</div>
                <div className="form h-[50%] w-full flex justify-center items-center space-x-4">
                    <form action="">
                        <div>
                            <div>
                                <h1 className='text-md font-semibold'>Email</h1>
                                <input onChange={handleChange} value={form.email} className='border rounded-md px-2 w-[250px]' type="email" name='email' />
                            </div>
                            <div><h1 className='font-semibold'>Password</h1>
                                <input onChange={handleChange} value={form.password} className='border rounded-md px-2 w-[250px]' type="password"name='password' />
                            </div>
                            <div className='flex justify-between items-center px-1 my-1 '>
                                <h2 className='text-[12px] font-medium text-red-800 cursor-pointer hover:underline'>Forgot Password</h2>
                                <h2 className='text-[12px] font-medium text-blue-800 cursor-pointer hover:underline'>Sign Up</h2>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="button h-[40px] w-full flex justify-center items-center">
                    <button onClick={handleSubmit} className='bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600'>Login</button>
                </div>   


            </div>
        </div>
    )
}

export default Login
