import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function ImageSlider({ images }) {

    return (
        <Carousel className="w-full max-w-[90%] mx-auto relative">
            <CarouselContent className="flex items-center justify-start">
                {images.map((image, index) => (
                    <CarouselItem
                        key={index}
                        className="flex-shrink-0 w-full flex justify-center items-center"
                    >
                        <div className="p-2 flex justify-center items-center w-full h-[500px]">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={1920}
                                height={1080}
                                className="object-cover w-full h-full rounded-lg"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md w-10 h-10"
            />
            <CarouselNext
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md w-10 h-10"
            />
        </Carousel>
    );
}
