import React from 'react'
import PostCard from '../componentSpace/PostCard';
const Home = () => {
    const samplePost = {
        userId: "John Doe",
        userLogo: "https://i.pravatar.cc/100?img=3",
        email: "john.doe@example.com",
        postText: "Just finished building a cool React component 🚀🔥",
        image: "https://th.bing.com/th/id/OIP.9m0eRmX9Yq0SQw_edDOJFwHaFM?w=268&h=188&c=7&r=0&o=7&pid=1.7&rm=3",
    };

    return (
        <div className="w-full h-auto bg-gray-900 flex items-center overflow-hidden flex-col justify-center p-4 pb-[110px]">
            <PostCard post={samplePost} />
            <PostCard post={samplePost} />
            <PostCard post={samplePost} />
            <PostCard post={samplePost} />
            <PostCard post={samplePost} />
        </div>
    );
}

export default Home;