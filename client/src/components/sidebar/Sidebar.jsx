import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories");
            setCats(res.data);
        };
        getCats();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
                    alt=""
                />
                <p>
                    Laboris sunt aute cupidatat velit magna velit ullamco dolore
                    mollit amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className="link">
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <FontAwesomeIcon
                        className="sidebarIcon"
                        icon={fab.faFacebookSquare}
                    />
                    <FontAwesomeIcon
                        className="sidebarIcon"
                        icon={fab.faInstagramSquare}
                    />
                    <FontAwesomeIcon
                        className="sidebarIcon"
                        icon={fab.faMedium}
                    />
                    <FontAwesomeIcon
                        className="sidebarIcon"
                        icon={fas.faMapMarkerAlt}
                    />
                </div>
            </div>
        </div>
    );
}
