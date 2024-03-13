import React from 'react';
import './loader.css';
import fileanimation from '../../lottie/filesanimation.json';
import loadinganimation from '../../lottie/loadinganimation.json';
import Lottie from 'react-lottie';

export function Loader() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadinganimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className='loading-overlay'> 
            <Lottie options={defaultOptions} height={300} width={600}/> 
        </div>
    );
}

export function FileAnimation() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: fileanimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className='file-animation'>
            <Lottie options={defaultOptions} height={300} width={600}/> 
        </div>
    );
}


export function FileAnimationsmall() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: fileanimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className='file-animation-small'>
            <Lottie options={defaultOptions} height={300} width={600}/> 
        </div>
    );
}