import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
    animationData: any;
    width?: string | number;
    height?: string | number;
    loop?: boolean;
    autoplay?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
    animationData,
    width = 300,
    height = 300,
    loop = true,
    autoplay = true
}) => {
    if (!animationData) {
        return null;
    }

    return (
        <div className="flex items-center justify-center">
            <div style={{ width, height }}>
                <Lottie
                    animationData={animationData}
                    loop={loop}
                    autoplay={autoplay}
                />
            </div>
        </div>
    );
};

export default LottieAnimation;