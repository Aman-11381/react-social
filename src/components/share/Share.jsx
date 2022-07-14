import React, { useRef } from 'react'
import './share.css'
import {PermMedia, Label, Room, EmojiEmotions} from '@mui/icons-material'
import { useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'
import { useState } from 'react'
import axios from 'axios'

export default function Share() {
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost  = {
            userId: user._id,
            desc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
              await axios.post("/upload", data);
            } catch (err) {}
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        }
        catch(err) {

        }
    }

    return (
        <div className='shareContainer'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+'person/noAvatar.png'} alt="" className="shareProfileImg" />
                    <input placeholder={"What's in your mind " + user.username + "?"} ref={desc} className="shareInput" />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor='tomato' className="shareIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{display: "none"}} type="file" id='file' accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue' className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod' className="shareIcon"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button type='submit' className="shareButton">Share</button>
                </form>
            </div>
        </div>
    )
}
