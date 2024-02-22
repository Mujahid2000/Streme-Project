"use client"
import { useState } from 'react';
import { login, signInWithGoogle } from '@/Provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import useUserInfo from '@/hooks/useUser';
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const userInfo = useUserInfo();
    const router = useRouter()
    const handleLogin = async (e) => {
        setError(''); // Clear error state
        e.preventDefault();
        try {
            await login(email, password);
            // Redirect to dashboard or another page upon successful login
            toast.success('Logged in successfully');
            if (userInfo && userInfo.isAdmin) {
                await router.push('/dashboard');
            } else if (userInfo && userInfo.isPayment){
                await router.push('/videos');
            }
            else {
                await router.push('/videos');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(''); // Clear error state
        try {
            await signInWithGoogle();
            // toast.success("Signed in with Google successfully");

            // Fetch user data from localhost:5000/user


            toast.success("Login successfully");
            if (userInfo && userInfo.isAdmin) {
                await router.push('/dashboard');
            } else {
                await router.push('/home');
            }


        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                setError("Sign-in process was closed by the user. Please try again.");
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <div className="login-container flex items-center justify-center min-h-screen" style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://i.ibb.co/m8KT5fz/hero-bg.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            maxHeight: "100vh"
          }}>
            <div className="max-w-sm w-full space-y-4 border border-spacing-1 p-4 rounded-md backdrop-blur-md bg-black bg-opacity-75">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Login</h2>
                    {error && <p className="mt-2 text-center text-red-600">{error}</p>}
                </div>
                <form className="mt-8 space-y-4 " onSubmit={handleLogin}>

                    <div className="rounded-md shadow-sm flex flex-col gap-4 ">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 focus:ring-indigo-500 px-3 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm placeholder-white bg-opacity-50 bg-white text-white border-gray-300 "
                                placeholder="Email address"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 focus:ring-indigo-500 px-3 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm placeholder-white bg-opacity-50 bg-white text-white border-gray-300 "
                                placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <button type="submit"  className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium border-gray-300 placeholder-gray-500 text-gray-300 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                            Sign in
                        </button>
                    </div>
                </form>

                <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center w-full justify-center gap-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-gray-300 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    <FaGoogle />
                    Sign Up with Google

                </button>
                <div className="text-center text-sm">
                    <span className='text-gray-300'>  If you don't have an account,</span> <Link href="/signup"><span className="text-red-600 font-medium hover:text-red-400">Sign up</span></Link>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
