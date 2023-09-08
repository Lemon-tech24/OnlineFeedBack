import React, { useEffect, useState } from 'react';
import { getPosts } from './getData/GetPost';

function PostsDisplay() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resObject = await getPosts();
                setPosts(resObject);
                console.log(resObject)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    return (
        <div className="postDisplay">

            {posts.map((post, key) => (
                <div className="" key={key}>{post.title}</div>
            ))}
        </div>
    );
}

export default PostsDisplay;
