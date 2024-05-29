import React, { useContext, useState } from 'react'
import loginIcons from '../assest/assest/signin.gif'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import {toast} from 'react-toastify'
import Context from '../context'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({email : "", password : ""})

    const navigate = useNavigate()
    const {fetchUserDetails, fetchUserAddToCart} = useContext(Context)
    const handleOnChange = (e) =>{
        const {name, value} = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name] :value
            }
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }
        if (dataApi.error) {
            toast.error(dataApi.message)
        }
    }
    console.log("data login", data)
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcons} alt='login icons'/>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>EMAIL: </label>
                        <div className='bg-slate-100 p-2'>
                            <input onChange={handleOnChange} name='email' value={data.email} type='email' placeholder='ENTER EMAIL' className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>
                    <div>
                        <label>PASSWORD: </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input type={showPassword ? "text" : "password"} onChange={handleOnChange} name='password' value={data.password} placeholder='ENTER PASSWORD' className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                                <span>
                                    {
                                        showPassword ? (
                                            
                                            <FaEyeSlash/>
                                        )
                                        :
                                        (
                                            <FaEye/>

                                        )
                                    }
                                </span>
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-700'>
                            FOROGT PASSWORD ?
                        </Link>
                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>LOGIN</button>
                </form>

                <p className='my-5'>DO YOU HAVE AN ACCOUNT? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>SIGN UP</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login