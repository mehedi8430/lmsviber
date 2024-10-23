"use server"

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";
import dbConnect from "@/service/mongo";

export async function createCourse(data) {
    try{
        const loggedinUser = await getLoggedInUser();
        data["instructor"] = loggedinUser?.id;
        const course = await create(data);
        
        return course;
    } catch(e){
        throw new Error(e);
    }
}

export async function updateCourse(courseId, dataToUpdate) {
    await dbConnect();

    try {
        await Course.findByIdAndUpdate(courseId, dataToUpdate);
    } catch(e){
        throw new Error(e);
    }
}