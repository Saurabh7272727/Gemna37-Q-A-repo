import React from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export default function PostCard({ post }) {
    return (
        <div className="max-w-xl w-full mx-auto bg-white rounded-2xl shadow-md pt-4 pb-4 mb-11 sm:p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <img
                    src={post.userLogo}
                    alt="User Logo"
                    className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                />
                <div>
                    <h3 className="text-gray-900 font-semibold">{post.userId}</h3>
                    <p className="text-gray-500 text-sm">{post.email}</p>
                </div>
            </div>

            {/* Post Text */}
            <p className="text-gray-800 mb-4">{post.postText}</p>

            {/* Post Image */}
            {post.image && (
                <div className="rounded-xl overflow-hidden mb-4">
                    <img
                        src={post.image}
                        alt="Post Content"
                        className="w-full object-cover max-h-[400px]"
                    />
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center text-gray-600 border-t pt-3">
                <button className="flex items-center gap-2 hover:text-pink-500 transition">
                    <Heart size={20} />
                    <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-500 transition">
                    <MessageCircle size={20} />
                    <span className="text-sm">Comment</span>
                </button>
                <button className="flex items-center gap-2 hover:text-green-500 transition">
                    <Share2 size={20} />
                    <span className="text-sm">Share</span>
                </button>
            </div>
        </div>
    );
}
