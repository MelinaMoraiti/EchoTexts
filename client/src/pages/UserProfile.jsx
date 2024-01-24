import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import {AlertContext} from "../context/AlertContext.jsx";
import CreatePostForm from "../components/CreatePostForm.jsx";
import {FaArrowRight} from "react-icons/fa";
import PostList from "../components/PostList.jsx";
import Dialog from "../components/Dialog.jsx";
import Navbar from "../components/Navbar.jsx";
import Tabs from "../components/Tabs.jsx";

const UserProfile = () => {
    const params = useParams()
    const location = useLocation()
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [selectedTab, setSelectedTab] = useState('Posts')
    const [followerDialogVisible, setFollowerDialogVisible] = useState(false);
    const [followingDialogVisible, setFollowingDialogVisible] = useState(false);
    const userContext = useContext(UserContext);
    const alertContext = useContext(AlertContext);
    const followInfoContainer = useRef();

    const {user_id} = location.state;

    useEffect(() => {
        // Reset everything in case of redirection to another user
        setIsLoading(true);
        setFollowingDialogVisible(false);
        setFollowerDialogVisible(false);

        const fetchProfile = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userContext.state.user_id}`,
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data)
                } else {
                    alertContext.addAlert("Failed to fetch user");
                }
            } catch (error) {
                console.error('Error fetching feed:', error);
                alertContext.addAlert("Failed to fetch feed");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [params]);

    function formatNumber(number) {
        if (number >= 1000000) {
            const formattedNumber = (number / 1000000).toFixed(1);
            return formattedNumber.endsWith('.0') ? `${Math.floor(formattedNumber)}M` : `${formattedNumber}M`;
        } else if (number >= 1000) {
            const formattedNumber = (number / 1000).toFixed(1);
            return formattedNumber.endsWith('.0') ? `${Math.floor(formattedNumber)}K` : `${formattedNumber}K`;
        } else {
            return `${number}`;
        }
    }

    const handleFollowerClick = (event) => {
        if (isLoading || userData?.followers?.length === 0) return;
        event.stopPropagation()
        if (followingDialogVisible) setFollowingDialogVisible(false)
        setFollowerDialogVisible(current => !current);
    }

    const handleFollowingClick = (event) => {
        if (isLoading || userData?.following?.length === 0) return;
        event.stopPropagation()
        if (followerDialogVisible) setFollowerDialogVisible(false);
        setFollowingDialogVisible(current => !current)
    }

    return <div className="mainContainer">
        <div className={"mainContainer-left-bar"}>
            <div className={"Vertical-Flex-Container"}>
                <CreatePostForm initialInput={`@${params.username}`} />
                <div className={"Panel-Thin"}>
                    <h2>{params.username}</h2>
                    <div className={"Horizontal-Flex-Container Space-Between"}>
                        <div className={"Horizontal-Flex-Container"} ref={followInfoContainer}>
                            <div className={"Hover-Underline"} onClick={handleFollowingClick}>
                                {"Following: "}
                                {!isLoading ? formatNumber(userData.following.length) : "..."}
                            </div>
                            <div className={"Hover-Underline"} onClick={handleFollowerClick}>
                                {"Followers: "}
                                {!isLoading ? formatNumber(userData.followers.length) : "..."}
                            </div>
                        </div>
                        <div className={"profile-date"}>Joined on: {!isLoading && (new Date(userData.user.created_at)).toLocaleDateString()}</div>
                    </div>
                    <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={['Posts', 'Replies', 'Likes']} />
                </div>

                {isLoading && <div>Loading...</div>}
                {!isLoading && selectedTab === 'Posts' &&
                    (userData.posts.length > 0 ? <PostList posts={userData.posts} /> : <h3 className={"Panel-Thin"}>{params.username} has made no posts</h3>)
                }
                {!isLoading && selectedTab === 'Likes' &&
                    (userData.likedPosts.length > 0 ? <PostList posts={userData.likedPosts} /> : <h3 className={"Panel-Thin"}>{params.username} has liked no posts</h3>)
                }
            </div>

        </div>
        <div className={"mainContainer-right-bar"}>
            <Navbar />
        </div>
        {!isLoading && followerDialogVisible && <Dialog attachedElementRef={followInfoContainer} collapseDialogFunction={() => setFollowerDialogVisible(false)}>
            <h3>Followers: {userData.followers.length}</h3>
            {userData.followers.map(follower => {
                return <Link
                    className={"Dialog-Option Horizontal-Flex-Container Space-Between"}
                    to={`/user/${follower.username}`}
                    state={{user_id: follower.user_id}}
                    key={follower.user_id}
                >
                    {follower.username}
                    <span
                        className={"hidden-right-arrow"}
                    ><FaArrowRight/></span>
                </Link>
            })}
        </Dialog>}
        {!isLoading && followingDialogVisible && <Dialog attachedElementRef={followInfoContainer} collapseDialogFunction={() => setFollowingDialogVisible(false)}>
            <h3>Following: {userData.following.length}</h3>
            {userData.following.map(following => {
                return <Link
                    className={"Dialog-Option Horizontal-Flex-Container Space-Between"}
                    to={`/user/${following.username}`}
                    state={{user_id: following.user_id}}
                    key={following.user_id}
                >
                    {following.username}
                    <span
                        className={"hidden-right-arrow"}
                    ><FaArrowRight/></span>
                </Link>
            })}
        </Dialog>}
    </div>
};

export default UserProfile;