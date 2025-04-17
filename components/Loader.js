import React from "react";
import Lottie from "react-lottie";
import loader from '../public/loader.json';


const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
          <div>
          <Lottie
                options={defaultOptions}
                height={400}
                width={400}
            />
          </div>
        </div>
    );
};

export default Loader;