import React from 'react'
import HeaderImg from "../Assests/header-img.svg"
import Typewriter from 'typewriter-effect';
// import {useNavigate} from "react-router-dom"
function Home() {
  // const navigate=useNavigate()
  // const gotoInventory=() =>{
  //   navigate("/inventory")
  // }
  return (
    <>
    
    <div className='home-txt'>
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString('You have been appointed by NASA to manage the martian inventory you need to ensure that the martian food is not wasted........ lets go !')
            .pauseFor(4500)
            .start();
        }}
      />
      </div>
      <div className='Home'>
      <img className='hero' src={HeaderImg} alt="astronut on  mars" />
      </div>

    </>
  )
}

export default Home