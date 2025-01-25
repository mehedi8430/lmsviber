"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full overflow-hidden">
            <div
                className="flex transition-transform ease-in-out duration-700"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0"
                        style={{ minWidth: "100%" }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={1920}
                            height={1080}
                            className="w-full h-auto"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
