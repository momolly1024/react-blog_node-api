import React, { useContext, useEffect, useState } from "react";
import "./singlepost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "localhost:5000/images/";
    const { user } = useContext(Context);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            console.log(res);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path]);

    const handleDelect = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: { username: user.username },
            });
            window.location.replace("/");
        } catch (err) {}
    };
    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title: title,
                desc,
            });
            // window.location.reload();
            setUpdateMode(false);
        } catch (err) {}
    };
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img
                        className="singlePostImg"
                        alt=""
                        src={PF + post.photo}
                    />
                )}
                {updateMode ? (
                    <input
                        type="text"
                        className="singlePostTitleInput"
                        value={title}
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTItle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <FontAwesomeIcon
                                    className="singlePostIcon"
                                    icon={fas.faEdit}
                                    onClick={() => setUpdateMode(true)}
                                />
                                <FontAwesomeIcon
                                    className="singlePostIcon"
                                    icon={fas.faTrashAlt}
                                    onClick={handleDelect}
                                />
                            </div>
                        )}
                    </h1>
                )}

                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?user=${post.userrname}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">
                        {new Date(post.createAt).toDateString()}
                    </span>
                </div>
                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className="singlePostDesc">{desc}</p>
                )}
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
}
