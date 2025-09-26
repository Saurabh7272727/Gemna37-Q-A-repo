import React from 'react'
import PostCard from '../componentSpace/PostCard';
const Home = () => {
    const samplePost = {
        userId: "John Doe",
        userLogo: "https://i.pravatar.cc/100?img=3",
        email: "john.doe@example.com",
        postText: "Just finished building a cool React component 🚀🔥",
        image: "../../../public/square-g.svg",
    };

    return (
        <div className="w-full h-auto bg-gray-900 flex items-center flex-col justify-center p-4 pb-[110px]">
            <PostCard post={samplePost} />
            <PostCard post={samplePost} />
            <PostCard post={samplePost} />
            <PostCard post={samplePost} />
            <PostCard post={samplePost} />
        </div>
    );
}

export default Home;