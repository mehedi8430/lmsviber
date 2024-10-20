//import { CourseProgress } from "@/components/course-progress";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import { redirect } from "next/navigation";
import EnrolledCourseCard from "../../component/enrolled-coursecard";

export default async function EnrolledCourses() {
	// const session = await auth();
	const loggedinUser = await getLoggedInUser();

	// if (!session?.user) {
	// 	redirect("/login");
	// }

	if (!loggedInUser) {
		redirect("/login");
	}

	// const loggedInUser = await getUserByEmail(session?.user?.email);
	const enrollments = await getEnrollmentsForUser(loggedInUser?.id);

	return (
		<div className="grid sm:grid-cols-2 gap-6">
			{
				enrollments && enrollments.length > 0 ? (
					<>
						{
							enrollments.map((enrollment) => (
								<EnrolledCourseCard
									key={enrollment?.id}
									enrollment={enrollment}
								/>
							))
						}
					</>
				) : (
					<p> No Enrollments found!</p>
				)
			}
		</div>
	);
}
