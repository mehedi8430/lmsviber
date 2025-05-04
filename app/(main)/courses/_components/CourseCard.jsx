import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { formatPrice } from "@/lib/formatPrice";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { EnrollCourse } from "@/components/enroll-course";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { hasEnrollmentForCourse } from "@/queries/enrollments";

const CourseCard = async ({ course }) => {
  console.log("course", course)
  const loggedinUser = await getLoggedInUser();
  const isEnrolled = await hasEnrollmentForCourse(course?.id, loggedinUser?.id);

  return (
    <div className="group shadow-lg hover:shadow-2xl bg-[rgba(144,137,252,0.2)] transition overflow-hidden rounded-lg p-3 h-full border-[1px] ">
      <Link key={course.id} href={`/courses/${course.id}`}>
        <div>
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              src={`/assets/images/courses/${course?.thumbnail}`}
              alt={course?.title}
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-orange-700 line-clamp-2">
              {course?.title}
            </div>
            <p className="text-xs text-muted-foreground">
              {course?.category?.title}
            </p>
            <div className="flex items-center gap-x-2 mt-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            </div>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <div>
                  <BookOpen className="w-4" />
                </div>
                <span>{course?.modules?.length} Chapters</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-4">
        {
          !isEnrolled && (
            <EnrollCourse
              asLink={true}
              courseId={course?.id}
            />
          )
        }
        {
          loggedinUser?.id && isEnrolled && (
            <Link
              href={`/courses/${course.id}/lesson`}
              className="text-sm px-4 py-1 rounded-full bg-orange-700 hover:bg-orange-700 hover:text-black text-white"
            >
              Continue
            </Link>
          )
        }

        <p className="text-md md:text-sm font-medium text-slate-700">
          {formatPrice(course?.price)}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
