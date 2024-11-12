import Lottie from 'lottie-react';
import lottie from '@lottie files/404.json';

const LottieAnimation = () => {
    return (
        <div style={{ width: '300px', height: '300px' }}> {/* Adjust size as needed */}
            <Lottie animationData={lottie} loop={true} />
            
        </div>
    );
};

export default LottieAnimation;
