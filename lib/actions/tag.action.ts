"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams, GetQuestionsByTagIdParams } from "./shared";
import Interaction from "@/database/interaction.model";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const {userId, limit = 3 } = params;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const tagCountMap = await Interaction.aggregate([
      { $match: { user: user._id, tags: { $exists: true, $ne: [] } } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);

    const topTags = tagCountMap.map((tagCount) => tagCount._id);

    const topTagDocuments = await Tag.find({ _id: { $in: topTags } });

    return topTagDocuments;
  } catch (error) {
    console.error("Error fetching top interacted tags:", error);
    throw error;
  }
}

// export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
//     try {
//         connectToDatabase();

//         const {userId, limit = 3} = params;

//         const user = await User.findById(userId)

//         if(!user) throw new Error('user not found')

//         // Find interactions for the user and group by tags
//         const tagCountMap = await Interaction.aggregate([
//             {$match: {user: user._id, tags: {$exists: true, $ne: []}}},
//             {$unwind: "$tags"},
//             {$group: {_id: "$tags", count: {$sum: 1}}},
//             {$sort: {count: -1}},
//             {$limit: limit}
//         ])

//         const topTags = tagCountMap.map((tagCount) => tagCount._id);

//         // Find the tag documents for top tags
//         const tagDocuments = await Tag.find({_id: {$in: topTags}});

//         return tagDocuments;
//     } catch(error) {
//         console.log(error)
//         throw error
//     }
// }

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if(searchQuery) {
      query.$or = [{name: { $regex: new RegExp(searchQuery, 'i')}}]
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 }
        break;
      case "recent":
        sortOptions = { createdAt: -1 }
        break;
      case "name":
        sortOptions = { name: 1 }
        break;
      case "old":
        sortOptions = { createdAt: 1 }
        break;
    
      default:
        break;
    }

    const totalTags = await Tag.countDocuments(query);

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

      const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId};

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' }}
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1 
      },
      populate: [
        { path: 'tags', model: Tag, select: "_id name" },
        { path: 'author', model: User, select: '_id clerkId name picture'}
      ]
    })

    if(!tag) {
      throw new Error('Tag not found');
    }

    const isNext = tag.questions.length > pageSize;
    
    const questions = tag.questions;

    return { tagTitle: tag.name, questions, isNext };

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" }}},
      { $sort: { numberOfQuestions: -1 }}, 
      { $limit: 5 }
    ])

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
