import "./topbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
    const { user, dispatch } = useContext(Context);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };
    const PF = "localhost:5000/images/";

    return (
        <div className="top">
            <div className="topLeft">
                <FontAwesomeIcon
                    className="topIcon"
                    icon={fab.faFacebookSquare}
                />
                <FontAwesomeIcon
                    className="topIcon"
                    icon={fab.faInstagramSquare}
                />
                <FontAwesomeIcon className="topIcon" icon={fab.faMedium} />
                <FontAwesomeIcon
                    className="topIcon"
                    icon={fas.faMapMarkerAlt}
                />
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">
                            HOME
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">
                            ABOUT
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">
                            CONTACT
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/write">
                            WRITE
                        </Link>
                    </li>
                    {user && (
                        <li className="topListItem" onClick={handleLogout}>
                            LOGOUT
                        </li>
                    )}
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link className="link" to="/settings">
                        <img
                            className="topImg"
                            src={
                                PF + user.profilePic ||
                                "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            }
                            alt=""
                        />
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to="/login">
                                LOGIN
                            </Link>
                        </li>
                        <li className="topListItem">
                            <Link className="link" to="/register">
                                REGISTER
                            </Link>
                        </li>
                    </ul>
                )}

                <FontAwesomeIcon
                    className="topSearchIcon"
                    icon={fas.faSearch}
                />
            </div>
        </div>
    );
}
