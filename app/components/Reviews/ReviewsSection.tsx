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

export default function ReviewsSection({ maxReviews = 4, showViewAllButton = true }: ReviewsProps) {
    const [user, setUser] = useState<User | null>(null);
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const { theme } = useTheme();
    const router = useRouter();

    const avgRating = reviews.length ? +(reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1) : 0;

    const formatTime = (createdAt: any) => {
        const date = createdAt?.toDate ? createdAt.toDate() : createdAt ? new Date(createdAt) : null;
        if (!date) return "Just now";
        const diff = Math.floor((Date.now() - date.getTime()) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
    };

    const toggleExpand = (id?: string) => {
        if (!id) return;
        setExpanded((s) => ({ ...s, [id]: !s[id] }));
    };

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
                collection(db, "testimonials"),
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
        if (!user) return toast.error("Please log in to submit a review.");
        if (!rating) return toast.error("Please select a rating.");
        if (!reviewText.trim()) return toast.error("Please write your review.");

        setLoading(true);
        try {
            let photoURL = "";
            if (photo) {
                const photoRef = ref(storage, `testimonials/${Date.now()}_${photo.name}`);
                await uploadBytes(photoRef, photo);
                photoURL = await getDownloadURL(photoRef);
            }

            await addDoc(collection(db, "testimonials"), {
                name: user.displayName || "Anonymous",
                email: user.email,
                rating,
                review: reviewText,
                photo: photoURL,
                createdAt: serverTimestamp(),
            });

            toast.success("Review submitted — thank you!");
            setRating(0);
            setReviewText("");
            setPhoto(null);
            setShowModal(false);

            const snapshot = await getDocs(
                query(
                    collection(db, "testimonials"),
                    orderBy("createdAt", "desc"),
                    ...(maxReviews ? [limitQuery(maxReviews)] : [])
                )
            );
            setReviews(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ReviewType) })));
        } catch (err) {
            console.error(err);
            toast.error("There was an error submitting your review. Please try again.");
        }
        setLoading(false);
    };

    const displayedReviews = maxReviews ? reviews.slice(0, maxReviews) : reviews;

    return (
        <section className="max-w-6xl mx-auto py-12 px-4" aria-labelledby="reviews-heading" aria-label="Customer reviews">
            <Toaster position="top-right" />

            <div className="flex flex-col items-center mb-10 gap-4">
                <h2 id="reviews-heading" className="text-3xl md:text-4xl font-bold text-center" style={{ color: '#cc2b63' }}>
                    What People Say...
                </h2>
                <p className="text-gray-500 mt-2">{reviews.length} reviews • <span className="font-semibold">{avgRating} / 5</span></p>

                <div className="flex items-center gap-3 mt-2">
                    <button
                        onClick={() => setShowModal(true)}
                        disabled={!user}
                        className={`px-5 py-2 rounded font-semibold transition shadow-sm flex items-center gap-2
              ${user ? "bg-[#b85c1b] text-white hover:bg-[#b9723f]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                    >
                        Write a review
                    </button>
                    {showViewAllButton && (
                        <button onClick={() => router.push("/testimonials")} className="px-4 py-2 text-sm text-gray-700 hover:underline">
                            View all
                        </button>
                    )}
                </div>
            </div>

            {!user && <p className="text-gray-600 mt-2">Please log in to submit a review.</p>}

            {displayedReviews.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-8">
                    <p className="text-gray-600">No reviews yet — be the first to share your experience.</p>
                    <button onClick={() => setShowModal(true)} disabled={!user} className={`px-5 py-2 rounded font-semibold ${user ? 'bg-[#b85c1b] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Write a review</button>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {displayedReviews.map((r) => (
                        <article key={r.id} tabIndex={0} className="p-8 border border-gray-300 rounded-2xl bg-white hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#b85c1b] flex flex-col items-center text-center h-full" aria-labelledby={`review-${r.id}-title`}>
                                    <div className="flex gap-1 mt-2 mb-4">
                                        {Array.from({ length: r.rating || 0 }).map((_, i) => (
                                            <FiStar key={i} className="text-yellow-400 text-xl" />
                                        ))}
                                    </div>

                                    <p className="text-gray-500 text-sm mb-6 max-w-[28rem]">
                                        {(r.review && r.review.length > 220 && !expanded[r.id ?? ""]) ? (
                                            <>
                                                {r.review.slice(0, 220)}
                                                <button aria-expanded={!!expanded[r.id ?? ""]} aria-controls={`review-${r.id}-body`} onClick={() => toggleExpand(r.id)} className="ml-2 text-[#b85c1b] font-medium">Read more</button>
                                            </>
                                        ) : (
                                            <>
                                                <span id={`review-${r.id}-body`}>{r.review}</span>
                                                {r.review && r.review.length > 220 && <button aria-expanded={!!expanded[r.id ?? ""]} aria-controls={`review-${r.id}-body`} onClick={() => toggleExpand(r.id)} className="ml-2 text-[#b85c1b] font-medium">Show less</button>}
                                            </>
                                        )}
                                    </p>

                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 mb-2">
                                            {r.photo ? (
                                                <img src={r.photo} alt={`${r.name} photo`} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-700 font-semibold">{(r.name || "").split(" ")[0]?.charAt(0) || "U"}</div>
                                            )}
                                        </div>
                                        <p className="font-semibold text-gray-800">{r.name}</p>
                                    </div>
                        </article>
                    ))}
                </div>
            )}

            {showViewAllButton && reviews.length >= maxReviews && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => router.push("/testimonials#reviews")}
                        aria-label="View all reviews"
                        className="px-6 py-2 bg-[#b85c1b] text-white hover:bg-[#b9723f] rounded cursor-pointer transition"
                    >
                        View all reviews
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

                        <h3 className="text-xl font-bold mb-2">Share your experience</h3>
                        <p className="text-gray-600 mb-4">Help others by giving honest feedback.</p>

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
                            placeholder="Tell us what you liked and what could be improved..."
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
                            {loading ? "Submitting..." : "Submit review"}
                        </button>

                    </div>
                </div>
            )}
        </section>
    );
}
