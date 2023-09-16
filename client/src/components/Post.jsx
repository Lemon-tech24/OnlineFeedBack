import React, { useEffect, useRef, useState } from 'react';
import { HiPhotograph } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { AddPost } from './fetch/AddPost';


function Post({ isOpenPost, handlePostClose, given, family, id }) {
    const navigate = useNavigate()
    const [selectedImg, setImg] = useState(null);
    const [base64, setBase64] = useState(null)
    const imgRef = useRef();
    const [title, setTitle] = useState('');
    const [txtPost, setTxtPost] = useState('');
    const [postAs, setPostAs] = useState(`${given} ${family}`);
    const [course, setCourse] = useState('');
    const [concern, setConcern] = useState('');



    const redirecting = () => {
        window.open('http://localhost:5173/home', '_self')
    }


    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handleImgChange = async (e) => {
        const img = e.target.files[0];

        if (!img) {

            return;
        }

        if (!img.type.startsWith("image/")) {
            console.log('Please select a photo only.');
            e.target.value = '';
            setImg(null);
            setBase64(null);
            return;
        } else {
            setImg(URL.createObjectURL(img));

            const base64 = await convertToBase64(img);
            setBase64(base64);
        }

    }

    const handleCancelImg = () => {
        if (selectedImg) {
            setImg(null);
            setBase64(null)
            imgRef.current.value = '';
        }
    }

    const handleSanitization = async (value) => {
        const sanitizedValue = await DOMPurify.sanitize(value);
        return sanitizedValue;
    };

    const Title = (e) => e.target.value && setTitle(e.target.value)
    const PostAs = (e) => e.target.value && setPostAs(e.target.value);
    const Concern = (e) => e.target.value && setConcern(e.target.value);
    const Course = (e) => e.target.value && setCourse(e.target.value)
    const TextPost = (e) => e.target.value && setTxtPost(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTitle = await handleSanitization(title);
        const newTxtPost = await handleSanitization(txtPost);
        const newPostAs = await handleSanitization(postAs);
        const newCourse = await handleSanitization(course);
        const newConcern = await handleSanitization(concern);
        const newId = await handleSanitization(id);


        console.log('Sanitized Title:', newTitle);
        console.log('Sanitized Text Post:', newTxtPost);
        console.log('Sanitized Post As:', newPostAs);
        console.log('Sanitized Course:', newCourse);
        console.log('Sanitized Concern:', newConcern);
        console.log('Sanitized ID:', newId);

        if (!newTitle || !newTxtPost || !newCourse || !newConcern || !newId) {
            console.error('Validation error: Please provide all required fields');
            return;
        }

        try {
            const data = {
                title: newTitle,
                txtpost: newTxtPost,
                postAs: newPostAs,
                course: newCourse,
                concern: newConcern,
                id: newId,
                photo: base64
            };

            const response = await AddPost(data);



            if (response.success) {
                console.log('Successfully Posted');
                redirecting()
            } else {
                console.log('Failed To Post');
            }


        } catch (err) {
            console.error(err);
        }

    };


    return (<>
        {isOpenPost && (
            <div className="post-overlay">

                <div className="post-box">

                    <div className="post-nav">
                        <h3>Add Feedback</h3>
                        <button onClick={handlePostClose}>Close</button>
                    </div>
                    <form className='post-form' onSubmit={handleSubmit}>
                        <input type="text" name='title' placeholder='Title: ?' onChange={Title} maxLength="100" required />
                        <textarea name="txtArea" id="" cols="30" rows="10" placeholder="Anything you want to post ?" maxLength="1000" onChange={TextPost}></textarea>
                        <div>
                            <div className="post-as">
                                <h3>Post As</h3>
                                <select name="post" onChange={PostAs} required>
                                    <option value="">Please Select</option>
                                    <option value={`${given} ${family}`}>{`${given} ${family}`}</option>
                                    <option value="anonymous">Anonymous</option>
                                </select>
                            </div>

                            <div className="course">
                                <h3>Course:</h3>
                                <select name="course" onChange={Course} required>
                                    <option value="">Please Select</option>
                                    <option value="CEIT">CEIT</option>
                                    <option value="CEAT">CEAT</option>
                                    <option value="CBEA">CBEA</option>
                                    <option value="CBET">CBET</option>
                                </select>
                            </div>


                            <div className="concern">
                                <h3>Concern:</h3>
                                <select name="concern" onChange={Concern} required>
                                    <option value="">Please Select</option>
                                    <option value="Facility">Facility</option>
                                    <option value="Student">Student</option>
                                    <option value="Etc">ETC.</option>
                                </select>
                            </div>


                            <div className="photo-box">
                                <h3>Add to your Post</h3>
                                <button type='button' onClick={() => imgRef.current.click()}>Photo <HiPhotograph /></button>
                            </div>

                        </div>
                        <input type="file" name="photo" ref={imgRef} onChange={handleImgChange} accept='image/*' style={{ display: 'none' }} />
                        {selectedImg && (
                            <div className="img-box">
                                {selectedImg && (<button type='button' onClick={handleCancelImg}>Remove Photo</button>)}
                                <img src={selectedImg} alt="selected file" />
                            </div>
                        )}
                        <button type="submit" className='submitBtn'>Post</button>
                    </form>
                </div>
            </div>
        )}
    </>)
}
export default Post;
