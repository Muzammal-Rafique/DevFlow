import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

const Questions = [
  {
    _id: "1",
    title: "How to learn TypeScript?",
    tags: [
      { _id: "101", name: "typescript" },
      { _id: "102", name: "learning" },
    ],
    author: {
      _id: "201",
      name: "Alice",
      picture: "https://example.com/alice.jpg",
    },
    upvotes: 10000,
    views: 5000000,
    answers: [],
    createdAt: new Date("2023-01-10T08:15:00Z"),
  },
  {
    _id: "2",
    title: "Best practices for React development?",
    tags: [
      { _id: "103", name: "react" },
      { _id: "104", name: "best-practices" },
    ],
    author: {
      _id: "202",
      name: "Bob",
      picture: "https://example.com/bob.jpg",
    },
    upvotes: 25,
    views: 100,
    answers: [],
    createdAt: new Date("2023-02-15T14:30:00Z"),
  },
  {
    _id: "3",
    title: "Getting started with Node.js",
    tags: [
      { _id: "105", name: "node.js" },
      { _id: "106", name: "getting-started" },
    ],
    author: {
      _id: "203",
      name: "Charlie",
      picture: "https://example.com/charlie.jpg",
    },
    upvotes: 15,
    views: 80,
    answers: [],
    createdAt: new Date("2023-03-20T12:45:00Z"),
  },
  {
    _id: "4",
    title: "CSS Flexbox vs Grid: Which is better?",
    tags: [
      { _id: "107", name: "css" },
      { _id: "108", name: "flexbox" },
      { _id: "109", name: "grid" },
    ],
    author: {
      _id: "204",
      name: "David",
      picture: "https://example.com/david.jpg",
    },
    upvotes: 30,
    views: 120,
    answers: [],
    createdAt: new Date("2023-04-05T17:20:00Z"),
  },
  {
    _id: "5",
    title: "Introduction to GraphQL",
    tags: [
      { _id: "110", name: "graphql" },
      { _id: "111", name: "api" },
    ],
    author: {
      _id: "205",
      name: "Eva",
      picture: "https://example.com/eva.jpg",
    },
    upvotes: 18,
    views: 90,
    answers: [],
    createdAt: new Date("2023-05-12T09:10:00Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {Questions.length > 0 ? (
          Questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no questions to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
