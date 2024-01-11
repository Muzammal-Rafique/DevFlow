import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const hotQuestions = [
  { _id: 1, title: "How do I use express as a custom server in NextJS?" },
  { _id: 2, title: "Cascading Deletes in SQLAlchemy?" },
  { _id: 3, title: "Hoew to perfectly center a div with Tailwind css?" },
  {
    _id: 4,
    title: "Best Practices for data fatching in Next JS Application with SSR?",
  },
  { _id: 5, title: "Redux Toolkit not updating the state as Expected?" },
];
const popularTags = [
  { _id: 1, name: "JavaScript", totalQuestions: 4 },
  { _id: 2, name: "React", totalQuestions: 5 },
  { _id: 3, name: "Next Js", totalQuestions: 1 },
  { _id: 4, name: "Vue", totalQuestions: 2 },
  { _id: 5, name: "Redux", totalQuestions: 3 },
];

const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 max-xl:hidden max-sm:hidden lg:w-[266px] dark:shadow-none ">
      <div>
        <h3 className="h3-bold text-dark200_light900 ">Top Questions</h3>
        <div className=" mt-7 flex flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h3 className="h3-bold text-dark200_light900 ">Popular Tags</h3>
        <div>
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
