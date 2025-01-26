
import { getCategories } from "@/queries/categories";
import { getCourseList } from "@/queries/courses";
import { CategoriesSection } from "./_components/categories-section";
import { CoursesSection } from "./_components/courses-section";
import { HeroSection } from "./_components/hero-section";
import { ImageSlider } from "./_components/image-slider";


const HomePage = async () => {
    const courses = await getCourseList();
    const categories = await getCategories();

    const sliderImages = [
        { src: "/assets/images/slider/slider-1.png", alt: "Slider Image 1" },
        { src: "/assets/images/slider/slider-2.png", alt: "Slider Image 2" },
        { src: "/assets/images/slider/slider-3.png", alt: "Slider Image 3" },
    ];

    return (
        <>
            <HeroSection />
            <ImageSlider images={sliderImages} />
            <CategoriesSection categories={categories} />
            <CoursesSection courses={courses} />
        </>
    );
};

export default HomePage;
