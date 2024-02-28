import  { useState, useEffect } from "react";
import '../css/imageslider.css';

const ImageSlider = () => {
    const images = [
        'src/assets/images/slide.jpg',
        'src/assets/images/slider2.jpeg',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const imageStyle = {
        width: '100vw',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: '8%',
        left: 0,
        transition: 'opacity 0.5s ease-in-out',

    };

    useEffect(() => {
        // Auto-advance the slider every 3 seconds
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="image" style={imageStyle}>
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Slider Image ${index + 1}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: index === currentImageIndex ? 'block' : 'none',
                    }}
                />
            ))}
        </div>
    );
};

export default ImageSlider;
