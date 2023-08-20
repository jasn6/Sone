import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './TopNavbar.css';
import RoomModal from "../RoomModal/RoomModal";

const api_base = "https://sone-study-app-d94f4d443349.herokuapp.com/api/study-room"
const TopNavbar = ({currRoom}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLeaveRoom = async () => {
      try {
      const res = await fetch(api_base+`/leaveRoom/${currRoom._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

    } catch (error) {
      console.error('Error leaving room:', error);
    }
    navigate("/")
  };

  return (
    <>
      <RoomModal isOpen={isModalOpen} onClose={handleModalToggle} />
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><span className ="roomButton" onClick={handleModalToggle}>Rooms</span></li>
        </ul>
        <ul className="nav-links">
          <li>{currRoom ? <div>{currRoom.roomName}</div>:null}</li>
          <li>{currRoom ? <span className ="roomButton" onClick={handleLeaveRoom}>Leave Room</span>:null}</li>
        </ul>
      </nav>
    </>
  );
};

export default TopNavbar;
