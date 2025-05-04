import { SectionTitle } from "@/components/section-title";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import CourseCard from "../courses/_components/CourseCard";

export const CoursesSection = ({ courses }) => {

    return (
        <section id="courses" className="container space-y-6 py-8 md:py-12 lg:py-24">
            <div className="flex items-center justify-between">
                <SectionTitle>Courses</SectionTitle>
                <Link
                    href="/courses"
                    className="text-sm font-medium hover:opacity-80 flex items-center gap-1 border border-orange-700 rounded-md px-4 py-2 hover:bg-orange-700 hover:text-white transition duration-200 ease-in-out"
                >
                    Browse All <ArrowRightIcon className="h-4 w-4" />
                </Link>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {courses.map((course) => (
                    <CourseCard key={course?.id} course={course} />
                ))}
            </div>
        </section>
    );
}