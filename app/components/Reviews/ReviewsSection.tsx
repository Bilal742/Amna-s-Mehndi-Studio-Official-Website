"use client";

import { useState, useEffect } from "react";
import { auth, db, storage } from "@/app/firebase/firebase";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit as limitQuery,
    serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FiStar, FiCamera, FiX } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "@/app/context/ThemeContext";
import { useRouter } from "next/navigation";

type ReviewType = {
    id?: string;
    name: string;
    email: string;
    rating: number;
    review: string;
    photo?: string;
    createdAt: any;
};

type ReviewsProps = {
    maxReviews?: number;
    showViewAllButton?: boolean;
};

export default function Testimonial({ maxReviews, showViewAllButton }: ReviewsProps) {
    const [user, setUser] = useState<User | null>(null);
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                if (!currentUser.displayName) {
                    await updateProfile(currentUser, { displayName: "Anonymous" });
                }
            }
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            const q = query(
                collection(db, "testimonial "),
                orderBy("createdAt", "desc"),
                ...(maxReviews ? [limitQuery(maxReviews)] : [])
            );
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as ReviewType),
            }));
            setReviews(data);
        };
        fetchReviews();
    }, [maxReviews]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setPhoto(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!user) return toast.error("Login to submit testimonial !");
        if (!rating) return toast.error("Select rating!");
        if (!reviewText) return toast.error("Write testimonial  text!");

        setLoading(true);
        try {
            let photoURL = "";
            if (photo) {
                const photoRef = ref(storage, `testimonial /${Date.now()}_${photo.name}`);
                await uploadBytes(photoRef, photo);
                photoURL = await getDownloadURL(photoRef);
            }

            await addDoc(collection(db, "testimonial "), {
                name: user.displayName || "Anonymous",
                email: user.email,
                rating,
                review: reviewText,
                photo: photoURL,
                createdAt: serverTimestamp(),
            });

            toast.success("Testimonial submitted!");
            setRating(0);
            setReviewText("");
            setPhoto(null);
            setShowModal(false);

            const snapshot = await getDocs(
                query(
                    collection(db, "testimonial "),
                    orderBy("createdAt", "desc"),
                    ...(maxReviews ? [limitQuery(maxReviews)] : [])
                )
            );
            setReviews(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ReviewType) })));
        } catch (err) {
            console.error(err);
            toast.error("Error submitting testimonial !");
        }
        setLoading(false);
    };

    const displayedReviews = maxReviews ? reviews.slice(0, maxReviews) : reviews;

    return (
        <section className="max-w-6xl mx-auto py-30 px-4">
            <Toaster position="top-right" />

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 style={{ color: theme.text }} className="text-3xl font-bold">
                    Our customers love us
                </h2>
                <p className="text-gray-600">{reviews.length} Testimonial </p>
            </div>

            <div className="mb-6">
                <button
                    onClick={() => setShowModal(true)}
                    disabled={!user}
                    className={`px-5 py-2 rounded font-semibold transition 
      ${user ? "bg-[#b85c1b] text-white hover:bg-[#b9723f] cursor-pointer" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
                >
                    Write a store testimonial 
                </button>
            </div>

            {!user && <p className="text-gray-600 mt-2">Please login to submit a testimonial .</p>}

            <div className="grid md:grid-cols-2 gap-6">
                {displayedReviews.map((r) => (
                    <div
                        key={r.id}
                        className="p-6 border rounded-xl shadow-lg flex gap-4 items-start bg-white hover:shadow-2xl transition"
                    >
                        {r.photo && (
                            <img src={r.photo} alt="Photo" className="w-16 h-16 rounded-full object-cover border" />
                        )}
                        <div>
                            <div className="flex gap-1 mb-2">
                                {Array.from({ length: r.rating }).map((_, i) => (
                                    <FiStar key={i} className="text-yellow-400" />
                                ))}
                            </div>
                            <p className="font-semibold text-lg">{r.name}</p>
                            <p className="text-gray-700 mt-1">{r.review}</p>
                        </div>
                    </div>
                ))}
            </div>

            {showViewAllButton && maxReviews && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => router.push("/testimonials")}
                        className="px-6 py-2 bg-[#b85c1b] text-white hover:bg-[#b9723f] rounded cursor-pointer transition"
                    >
                        View All Testimonial 
                    </button>
                </div>
            )}


            {showModal && user && (
                <div className="fixed inset-0 bg-transparent bg-opacity-70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-2xl">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl cursor-pointer"
                        >
                            <FiX />
                        </button>

                        <h3 className="text-xl font-bold mb-2">Write a store testimonial </h3>
                        <p className="text-gray-600 mb-4">Share your feedback with us now</p>

                        <div className="flex gap-2 mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setRating(i + 1)}
                                    className={`text-2xl ${i < rating ? "text-yellow-400" : "text-gray-400"}`}
                                >
                                    <FiStar />
                                </button>
                            ))}
                        </div>

                        <textarea
                            maxLength={2000}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="w-full border rounded p-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Your testimonial ..."
                        />

                        <div className="flex items-center gap-2 mb-4">
                            <label className="cursor-pointer flex items-center gap-1 text-blue-600 hover:text-blue-800">
                                <FiCamera /> Add photo
                                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                            </label>
                            {photo && <span className="text-gray-700">{photo.name}</span>}
                        </div>

                        <p className="text-sm text-gray-500 mb-4">
                            Add a photo to get 15% off for your next purchase!
                            <br />
                            By submitting, you agree to our Privacy Policy and Terms.
                        </p>

                        <p className="text-gray-700 mb-1">
                            <strong>Your name:</strong> {user.displayName}
                        </p>
                        <p className="text-gray-700 mb-4">
                            <strong>Your email:</strong> {user.email}
                        </p>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`w-full px-4 py-2 text-white rounded transition font-semibold
        ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#b85c1b] hover:bg-[#b9723f] cursor-pointer"
                                }`}
                        >
                            {loading ? "Submitting..." : "Submit testimonial "}
                        </button>

                    </div>
                </div>
            )}
        </section>
    );
}
