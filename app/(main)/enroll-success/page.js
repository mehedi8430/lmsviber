import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { sendEmails } from "@/lib/emails";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { enrollForCourse } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";

// http://localhost:3000/enroll-success?session_id=cs_test_a17tWnorUinzTC90mQ4C84zexfofggqqYFOEoqT5uUjji7zUm1Pgu6zz2g&courseId=664aca881387e2ad2e8be484

const Success = async ({ searchParams: { session_id, courseId } }) => {
  if (!session_id) throw new Error("Please provide a valid session id that starts with cs_");

  const userSession = await auth();

  if (!userSession?.user?.email) {
    redirect("/login");
  }

  const course = await getCourseDetails(courseId);
  const loggedInUser = await getUserByEmail(userSession?.user?.email);

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });
  // const paidPersonEmail = checkoutSession?.customer_details?.email;
  // console.log(`Paid person email: ${paidPersonEmail}`)

  const paymentIntent = checkoutSession?.payment_intent;
  const paymentStatus = paymentIntent?.status;

  const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
  const customerEmail = loggedInUser?.email;
  const productName = course?.title;

  if (paymentStatus === "succeeded") {
    // Update DB(Enrollment collection)
    const enrolled = await enrollForCourse(
      course?.id,
      loggedInUser?.id,
      "stripe"
    );

    // Send Emails to the instructor, student,and the person who paid
    const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
    const instructorEmail = course?.instructor?.email;

    // TODO: Send Emails to the the person who paid
    // hints: if paymentIntent email is not same customerEmail 
    // const emailsToSend = paidPersonEmail !== customerEmail ? [instructorEmail, customerEmail, paidpersonemail] : [instructorEmail, customerEmail]

    const emailsToSend = [
      {
        to: instructorEmail,
        subject: `New Enrollment for ${productName}.`,
        message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${productName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
      },
      {
        to: customerEmail,
        subject: `Enrollment Success for ${productName}`,
        message: `Hey ${customerName} You have successfully enrolled for the course ${productName}`,
      },
    ];

    const emailSentResponse = await sendEmails(emailsToSend);
  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {/* TODO: handle paymentstatus is in-progress or any  */}
        {
          paymentStatus === "succeeded" && (
            <>
              <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
              <h1 className="text-xl md:text-2xl lg:text-3xl">
                Congratulations, <strong>{customerName}</strong>! Your Enrollment
                was Successful for <strong>{productName}</strong>
              </h1>
            </>
          )
        }
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/think-in-a-redux-way/introduction">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
