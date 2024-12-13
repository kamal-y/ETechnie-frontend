
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!email || !password || !name) {
            toast.error('Email, Password, and Name are required!');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        console.log("Inside signup");

        try {
            const response = await axios.post('http://localhost:8000/api/user/signup', { email, password, name });
            console.log("Response:", response.data);

            const { token } = response.data; 
            if (token) {
                toast.success('Registered successfully!');
                router.push('/user/login'); // Redirect to Login page
            } else if (response.data.error) {
                toast.error(response.data.error); 
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error('Sign up failed. Invalid input fields!');
        }
    };


    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">

                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Sign up</h2>
                        <form className="mt-8 space-y-4" >
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">User Name</label>
                                <div className="relative flex items-center">
                                    <input name="username" value={name} type="name" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter username" />
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                    <input name="username" value={email} type="email" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Set Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        value={password}
                                        required
                                        classNameName="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Enter password"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-4 h-4 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        viewBox="0 0 128 128"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    >
                                        <path
                                            d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                            data-original="#000000"
                                        ></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button type="button" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" onClick={handleSignup}>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
