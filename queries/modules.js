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