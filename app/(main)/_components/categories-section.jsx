import { SectionTitle } from "@/components/section-title";
import { ArrowRightIcon, Link } from "lucide-react";
import Image from "next/image";

export const CategoriesSection = ({ categories }) => {
    console.log("categories", categories)

    return (
        <section
            id="categories"
            className="container space-y-6 py-8 md:py-12 lg:py-24"
        >
            <div className="flex items-center justify-between">
                <SectionTitle>Categories</SectionTitle>
                <Link
                    href="/categories"
                    className="text-sm font-medium hover:opacity-80 flex items-center gap-1"
                >
                    Browse All <ArrowRightIcon className="h-4 w-4" />
                </Link>
            </div>
            <div className="mx-auto grid justify-center gap-4 grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
                {categories.map((category) => (
                    <Link
                        href={`/categories/${category?.id}`}
                        key={category?.id}
                        className="relative overflow-hidden rounded-lg border bg-background p-2 hover:scale-105 transition-all duration-500 ease-in-out"
                    >
                        {console.log("in the category card")}
                        {console.log("category title", category?.title)}
                        <h1>qwdgfe</h1>
                        <div className="flex flex-col gap-4 items-center justify-between rounded-md p-6">
                            <Image
                                src={`/assets/images/categories/${category?.thumbnail}`}
                                alt={category?.title}
                                width={100}
                                height={100}
                            />
                            <h3 className="font-bold">{category?.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}