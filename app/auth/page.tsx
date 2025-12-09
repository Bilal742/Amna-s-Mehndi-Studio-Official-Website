"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { auth, googleProvider } from "@/app/firebase/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import themeColors from "../components/themeColors/themeColors";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const theme = themeColors.dark;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!isLogin && formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match");
                setLoading(false);
                return;
            }

            if (isLogin) {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                toast.success("Logged in successfully!");
            } else {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );
                await updateProfile(userCredential.user, { displayName: formData.name });
                toast.success("Account created successfully!");
            }

            setFormData({ name: "", email: "", password: "", confirmPassword: "" });
            router.push("/");
        } catch (err: unknown) {
            if (err instanceof Error) toast.error(err.message);
            else toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            toast.success("Logged in with Google!");
            router.push("/");
        } catch (err: unknown) {
            if (err instanceof Error) toast.error(err.message);
            else toast.error("Google Sign-in failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 pt-32 bg-[#fffaf6]">
            <Toaster position="top-center" />
            <div className="max-w-md w-full">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center text-[#b85c1b]">
                        {isLogin ? "Login" : "Sign Up"}
                    </h1>

                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className={`cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-3 bg-white 
              text-gray-800 rounded-lg font-semibold transition mb-6 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 
        0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 
        6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 
        12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 
        4 16.318 4 9.656 8.337 6.306 14.691z"/>
                            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.182-5.238C29.211 
        35.091 26.715 36 24 36c-5.202 0-9.598-3.317-11.254-7.946l-6.522 
        5.025C9.63 39.556 16.335 44 24 44z"/>
                            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.793 
        2.239-2.231 4.166-4.076 5.57L37.409 38.808C41.014 
        35.539 43.351 30.979 43.611 25.917z"/>
                        </svg>
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="text-sm text-gray-400">OR</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Name"
                                        className="w-full pl-10 pr-4 py-2 rounded border border-gray-300"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-2 rounded border border-gray-300"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Password"
                                    className="w-full pl-10 pr-4 py-2 rounded border border-gray-300"
                                />
                            </div>
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Confirm Password"
                                        className="w-full pl-10 pr-4 py-2 rounded border border-gray-300"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ background: theme.text, color: theme.background }}
                            className={`cursor-pointer w-full py-3 rounded-lg font-semibold text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
                                }}
                                className="hover:underline cursor-pointer"
                                style={{ background: theme.background, color: theme.text }}
                            >
                                {isLogin ? "Sign Up" : "Login"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
