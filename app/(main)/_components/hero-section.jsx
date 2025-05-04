import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => (
    <section className="space-y-6 py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="order-2 md:order-1">
                <Image
                    src="/assets/hero.png"
                    alt="Hero Image"
                    width={500}
                    height={500}
                    className="object-contain w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]"
                />
            </div>

            <div className="order-1 md:order-2 flex flex-col items-center gap-4 text-center relative isolate">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                    Learn Smart. Vibe Higher.
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    “Smart learning lights the path; your vibe fuels the journey”
                </p>
                <div className="flex items-center gap-3 flex-wrap justify-center">
                    <Link
                        href="/courses"
                        className={cn(buttonVariants({ size: "lg" }), "bg-custom hover:bg-customHover")}
                    >
                        Explore Now
                    </Link>
                    <Link
                        href="/register/instructor"
                        className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border border-custom hover:bg-custom hover:text-white")}
                    >
                        Become An Instructor
                    </Link>
                </div>
            </div>
        </div>
    </section>
);
