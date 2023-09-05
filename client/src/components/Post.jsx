import React, { useRef, useState } from 'react';
import { HiPhoto } from 'react-icons/hi2'
import { FaTags } from 'react-icons/fa'

function Post({ isOpenPost, handlePostClose, name }) {
    const [img, setImg] = useState(null)
    const ref = useRef(null);

    const openRef = () => {
        ref.current.click();
    }

    const handleChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setImg(URL.createObjectURL(selected));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <>
            {isOpenPost && (
                <div className="post-overlay">
                    <div className="post-box">
                        <div className="post-nav">
                            <button onClick={handlePostClose}>Cancel</button>
                        </div>

                        <form className='post-form'>
                            <div>
                                <label htmlFor="fruits">Post as </label>
                                <select id="fruits" name="fruit">
                                    <option value={name}>{name}</option>
                                    <option value="anonymous">Anonymous</option>
                                </select>
                            </div>

                            <div className="post-inputs">
                                <textarea
                                    cols="30"
                                    rows="10"
                                    placeholder="Any feedback you want to add?"
                                    required
                                />

                                {img && (
                                    <div className="img-box">
                                        <img src={img} />
                                    </div>
                                )}
                                <div className="addOns">
                                    <p>Add to your Post</p>



                                    <input
                                        type="file"
                                        accept='image/*'
                                        ref={ref}
                                        onChange={handleChange}
                                        hidden
                                    />

                                    <div>
                                        <HiPhoto onClick={openRef} />
                                        <FaTags />
                                    </div>
                                </div>
                            </div>


                            <button type="submit" onClick={handleSubmit}>POST</button>
                        </form>
                    </div >
                </div >
            )
            }
        </>
    );
}

export default Post;
