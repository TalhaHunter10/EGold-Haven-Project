import React from 'react'
import './loader.css'
import fileanimation from '../../lottie/filesanimation.json'
import Lottie from 'react-lottie'

function loader() {
    const defaultoptions = {
        loop: true,
        autoplay: true,
        animationData: fileanimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
    
    return (
        <div className='loading-overlay'> 
        <Lottie options={defaultoptions} height={400} width={800}/> 
        </div>
    );
}

export default loader;