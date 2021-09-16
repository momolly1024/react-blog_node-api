import React, { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const PF = "localhost:5000/images/"

    const handleSubmit = async (e) => {
        e.prenentDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;

            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;

            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.put("/users/" + user.id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

            // window.location.replace("/post/" + res.data._id);
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });

        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">
                        Update Your Account
                    </span>
                    <span className="settingsDelectTitle">Delect Account </span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : PF+user.profilePic
                            }
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <FontAwesomeIcon
                                className="settingsPPIcon"
                                icon={fas.faUser}
                            />
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>
                    {success && (
                        <span
                            style={{
                                color: "green",
                                textAlign: "center",
                                marginTop: "20px",
                            }}
                        >
                            Profile has been updeated
                        </span>
                    )}
                </form>
            </div>
            <Sidebar />
        </div>
    );
}
