import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson-model";
import { Module } from "@/model/module-model";
import dbConnect from "@/service/mongo";

export async function create(moduleData) {
    await dbConnect();

    try {
        const myModule = await Module.create(moduleData);

        return JSON.parse(JSON.stringify(myModule));
    } catch (e) {
        throw new Error(e);
    }
}

export async function getModule(moduleId) {
    await dbConnect();

    try {
        const myModule = await Module.findById(moduleId).populate({
            path: "lessonIds",
            model: Lesson
        }).lean();

        return replaceMongoIdInObject(myModule);
    } catch (e) {
        throw new Error(e)
    }
}

export async function getModuleBySlug(moduleSlug) {
    await dbConnect();

    try {
        const myModule = await Module.findOne({slug: moduleSlug}).lean();
        return replaceMongoIdInObject(myModule);
    } catch(err) {
        throw new Error(err);
    }
}