import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import TopNavbar from "../components/TopNavbar/TopNavbar";
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import "./HomePage.css"

const api_base = "https://sone-study-app-d94f4d443349.herokuapp.com/api/user/"

function HomePage() {
  const [currentVideo, setCurrentVideo] = useState("https://sone-bg-videos.s3.amazonaws.com/Videos/SunHigh1.mov");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function populateUserInfo() {
    try {
      const req = await fetch(api_base + "profile", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });

      // Check if response status is not okay (like 401 for unauthorized)
      if (!req.ok) {
        throw new Error('Unauthorized');
      }

      const data = await req.json();
      if (data.status === "ok") {
        setUser(data.user);
        if (data.user && data.user.inRoom) {
          navigate(`/room/${data.user.inRoom}`);
          return; // stop further execution
        }
      }
    } catch (error) {
      if (error.message === 'Unauthorized') {
        navigate("/login")
        return; // stop further execution
      }
      console.error("An error occurred:", error);
    } finally {
      setLoading(false); // authentication check completed, stop showing loading state
    }
  }

  useEffect(() => {
    populateUserInfo();
  }, []);

  const handleVideoChange = (newVideo) => {
    setCurrentVideo(newVideo);
  };
  // If it's loading, you can return a spinner or a simple message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <TopNavbar currRoom={null}></TopNavbar>
      <Navbar onChange={handleVideoChange} user={user}></Navbar>
      <div className="video-background">
        <ReactPlayer
          url={currentVideo}
          playing
          loop
          muted
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default HomePage;
