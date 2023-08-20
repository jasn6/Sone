import React, {useState} from "react";
import "./Background.css";
import Draggable from "react-draggable";
import * as AiIcons from "react-icons/ai"

import * as TbIcons from "react-icons/tb";

const aws_videos = "https://sone-bg-videos.s3.amazonaws.com/Videos"
const aws_pics = "https://sone-bg-videos.s3.amazonaws.com/Pictures"

function Background({onChange,onClose}) {
    const Time = [false,false,true,false,false,false];

    const [currentSet, setCurrentSet] = React.useState(Time);

    const initialX = 400;
    const initialY = 300;
    const [position, setPosition] = useState({ x: initialX, y: initialY });

    const handleVideoChange = (newVideo) => {
      onChange(newVideo);
    };

    const handleSetChange = (index) => {
        const updatedSet = currentSet.map((_,i) =>
            i === index
        );
        setCurrentSet(updatedSet);
    }

    const handleDrag = (e, ui) => {
        const { x, y } = position;
        const { width, height } = position;
        const innerWidth = document.documentElement.clientWidth - 100;
        const innerHeight = document.documentElement.clientHeight - 100;

        const newPosition = {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
        };

            setPosition(newPosition);
        };

    const handleClose = () => {
    if (onClose) {
        onClose();
    }
    };
    return (
        <div className="Whole">
            <Draggable
                position={position}
                onDrag={handleDrag}
                handle=".BackHandle"
            >
            <div className="BackMain">
                <div className="BackHandle">
                    <div className="BackHandle-content">Background</div>
                    <button className="Backclose-button" onClick={handleClose}>
                    <AiIcons.AiOutlineClose></AiIcons.AiOutlineClose>
                    </button>
                </div>
            <div className="mini-sidebar">
                <div className="Suns">
                    <button className="SunRise" onClick={() => handleSetChange(0)}>
                        <TbIcons.TbSunrise></TbIcons.TbSunrise>
                    </button>
                    <button className="SunRise2" onClick={() => handleSetChange(1)}>
                        <TbIcons.TbSunset2> </TbIcons.TbSunset2>
                    </button>
                    <button className="SunHigh" onClick={() => handleSetChange(2)}>
                        <TbIcons.TbSunHigh></TbIcons.TbSunHigh>
                    </button>
                    <button className="SunSet" onClick={() => handleSetChange(3)}>
                        <TbIcons.TbSunset></TbIcons.TbSunset>
                    </button>
                    <button className="Moon" onClick={() => handleSetChange(4)}>
                        <TbIcons.TbMoonStars></TbIcons.TbMoonStars> 
                    </button>
                    <button className="huh" onClick={() => handleSetChange(5)}>
                        <TbIcons.TbQuestionMark></TbIcons.TbQuestionMark> 
                    </button>
                </div>
            <div>
                {currentSet.map((isVisible, index) => (
                    <div>
                    {isVisible && index === 0 && <div className="SR">
                        <button className="options" onClick={() => handleVideoChange(aws_videos + "/SunHigh1.mov")}><img src="./idk.png" alt="NA"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/SunHigh1.mov")}><img src="./idk.png" alt="NA"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/Fish.mov")}><img src="./idk.png" alt="NA"/> </button>
                        </div>}

                    {isVisible && index === 1 && <div className="SR2">
                        <button className="options" onClick={() => handleVideoChange(aws_videos+"/SquirrelPizza.mov")}><img src={aws_pics + "/SquirrelPizza.png"} alt="NA"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/SunHigh2.mov")}><img src="./idk.png" alt="NA"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/Fish.mov")}><img src="./idk.png" alt="NA"/> </button>
                        </div>}

                    {isVisible && index === 2 && <div className="SH">
                        <button className="options" onClick={() => handleVideoChange(aws_videos + "/SunHigh1.mov")}><img src={aws_pics + "/SunHigh1.png"} alt="SunHigh1"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/SunHigh2.mov")}><img src={aws_pics + "/SunHigh2.png"} alt="SunHigh2"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/SunHigh2.mov")}><img src={aws_pics + "/SunHigh2.png"} alt="SunHigh2"/> </button>
                        </div>}

                    {isVisible && index === 3 && <div className="SS">
                        <button className="options" onClick={() => handleVideoChange(aws_videos + "/RedSun.mov")}><img src={aws_pics + "/RedSun.png"} alt="RedSun"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/Sunsetbird.mov")}><img src={aws_pics+"/Sunsetbird.png"} alt="SSB"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/Sunsetbird2.mov")}><img src={aws_pics + "/Sunsetbird2.png"} alt="SSB2"/> </button>
                        </div>}

                    {isVisible && index === 4 && <div className="M">
                        <button className="options" onClick={() => handleVideoChange(aws_videos + "/NightRain.mov")}><img src={aws_pics + "/NightRain.png"} alt="NightRain"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/SunHigh1.mov")}><img src="./idk.png" alt="NA"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/Fish.mov")}><img src="./idk.png" alt="NA"/> </button>
                        </div>}

                    {isVisible && index === 5 && <div className="hu">
                        <button className="options" onClick={() => handleVideoChange(aws_videos + "/CampFire.mov")}><img src={aws_pics + "/CampFire.png"} alt="Campfire"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/Fish.mov")}><img src={aws_pics + "/Fish.png"} alt="Fish"/> </button>
                        <button className="options"onClick={() => handleVideoChange(aws_videos + "/Street.mov")}><img src={aws_pics + "/Street.png"} alt="Street"/> </button>
                        </div>}
                    </div>

                    
                ))}
            </div>
        </div>

            </div>
          
            </Draggable>
      </div>
      
    );
  };
  
  export default Background;