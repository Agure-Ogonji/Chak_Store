import React, { useState } from 'react'
import loginIcons from '../assest/assest/signin.gif'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import imageToBase64 from '../helpers/imageToBase64'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPasswword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({email : "", password : "", name : "", confirmPassword : "", profilePic : ""})
    const navigate = useNavigate()
    const handleOnChange = (e) =>{
        const {name, value} = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name] :value
            }
        })
    }

    const handleUploadPlc = async(e) =>{
        const file = e.target.files[0]

        const imagePic = await imageToBase64(file)
        setData((prev)=>{
            return{
                ...prev,
                profilePic : imagePic 
            }
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()

        if (data.password === data.confirmPassword) {

            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method : SummaryApi.signUp.method,
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })
    
    
            const dataApi = await dataResponse.json()

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            }
            if (dataApi.error) {
                toast.error(dataApi.message)
            }
            
        }else{
            toast.error("PLEASE CHECK THE PASSWORD AND CONFIRM PASSWORD")
        }
    }
  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginIcons} alt='login icons'/>
                    </div>
                    <form>
                        <label>                         
                            <div className='text-xs bg-opacity-80 pb-4 pt-2 cursor-pointer bg-slate-200 py-4 text-center absolute bottom-0 w-full'>
                                Upload Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPlc}/>    
                        </label>
                    </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>NAME: </label>
                        <div className='bg-slate-100 p-2'>
                            <input type='text' placeholder='ENTER YOUR NAME' name='name' value={data.name} onChange={handleOnChange} required className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>
                    <div className='grid'>
                        <label>EMAIL: </label>
                        <div className='bg-slate-100 p-2'>
                            <input  type='email' placeholder='ENTER EMAIL' name='email' value={data.email} onChange={handleOnChange} required className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>
                    <div>
                        <label>PASSWORD: </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input type={showPassword ? "text" : "password"} required onChange={handleOnChange} name='password' value={data.password} placeholder='ENTER PASSWORD' className='w-full h-full outline-none bg-transparent'/>
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
                    </div>
                    
                    <div>
                        <label>CONFIRM PASSWORD: </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input type={showConfirmPasswword ? "text" : "password"} required onChange={handleOnChange} name='confirmPassword' value={data.confirmPassword} placeholder='ENTER CONFIRM PASSWORD' className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                                <span>
                                    {
                                        showConfirmPasswword ? (
                                            
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
                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>SIGN UP</button>
                </form>

                <p className='my-5'>DO YOU ALREADY HAVE AN ACCOUNT? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>LOGIN</Link></p>
            </div>
        </div>
    </section>
  )
}

export default SignUp