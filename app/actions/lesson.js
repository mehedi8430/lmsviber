"use server"

import { Lesson } from "@/model/lesson-model";
import { Module } from "@/model/module-model";
import { create } from "@/queries/lessons";
import dbConnect from "@/service/mongo";

export async function createLesson(data) {
  await dbConnect();

  try {
    const title = data.get("title");
    const slug = data.get("slug");
    const moduleId = data.get("moduleId");
    const order = data.get("order");

    const createdLesson = await create({title, slug, moduleId, order});

    const myModule = await Module.findById(moduleId);
    myModule.lessonIds.push(createdLesson._id);
    myModule.save();

    return createdLesson;
  } catch (err) {
    throw new Error(err);
  }
}

export async function reOrderLesson(data) {
  await dbConnect();

    try {
        await Promise.all(data.map(async (element) => {
                await Lesson.findByIdAndUpdate(element.id, {order: element.position});
        }));
    } catch (err) {
        throw new Error(err);
    }
}

export async function updateLesson(lessonId, data) {
  await dbConnect();

  try {
    await Lesson.findByIdAndUpdate(lessonId, data);
  } catch (err) {
    throw new Error(err);
  }
}