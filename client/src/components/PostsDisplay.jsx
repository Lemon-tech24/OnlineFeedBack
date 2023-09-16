import React, { useEffect, useState } from 'react';
import { getPosts } from './getData/GetPost';

function PostsDisplay() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resObject = await getPosts();
                setPosts(resObject);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    return (
        <>
            <div className='posts'>

                {posts ? (
                    posts.map((post, key) => (
                        <div className='post-display' key={key}>
                            <div className="post-title">{post.title}</div>
                            <div className="post-concern">
                                <div>{post.concern}</div>
                            </div>
                            <div className="post-user"><img src="profile.png" />{post.anonymous ? 'Anonymous' : (post.user.name)}</div>
                            {post.photo ? (
                                <div className="post-image">
                                    <img src={post.photo} alt={post.title} />
                                </div>
                            ) : null}
                            {post.txtpost ? (<div className='post-txt'>{post.txtpost}</div>) : null}

                            <div className="post-btn">
                                <button type="button">DETAILS</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='loading' style={{ fontSize: '50px' }}>Loading....</div>
                )}

            </div >

        </>
    );
}

export default PostsDisplay;
