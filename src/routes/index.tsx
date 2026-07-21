import { SignedIn } from "@clerk/clerk-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ArrowUpRight } from "lucide-react";
import { Background } from "@/components/shared/background";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
    return (
        <Background>
            <section className="container py-20 lg:py-32">
                <div className="flex flex-col items-center gap-10 lg:my-0 lg:flex-row">
                    <div className="flex flex-col gap-7 lg:w-2/3">
                        <h2 className="text-foreground text-5xl font-semibold md:text-5xl lg:text-8xl">
                            <span className="title text-5xl md:text-5xl lg:text-8xl tracking-wider">
                                Kumar Piccadilly
                            </span>
                            <span className="title text-5xl md:text-5xl lg:text-8xl font-semibold text-accent">
                                {" "}
                                Funds Management
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg lg:text-xl">
                            Get insights on the funds available in KP Cultural
                            and Temple committee.
                        </p>
                        <div className="flex flex-wrap items-start gap-5 lg:gap-7">
                            <Button asChild>
                                <Link to={"/sign-in/$"}>
                                    <div className="flex items-center gap-2">
                                        <ArrowUpRight className="size-4" />
                                    </div>
                                    <span className="whitespace-nowrap pl-4 pr-6 text-sm lg:pl-6 lg:pr-8 lg:text-base">
                                        Get Started
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="relative z-10">
                        <div className="left-1/2! h-[92%]! w-[69%]! absolute top-2.5 -translate-x-[52%] overflow-hidden rounded-[35px]">
                            <img
                                src={
                                    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-7-tall.svg"
                                }
                                alt={"Placeholder"}
                                className="size-full object-cover object-[50%_0%]"
                            />
                        </div>
                        <Image
                            className="relative z-10"
                            src={"./wallet.svg"}
                            width={450}
                            height={889}
                            alt="iphone"
                        />
                    </div>
                </div>
            </section>
            <SignedIn>
                <div className="sticky flex w-full justify-end bottom-4 right-4">
                    {/* <TxnButton
						year={control.activeYear}
						className="aspect-square size-12 gap-1 bg-primary text-primary-foreground shadow-lg shadow-chart-1 flex items-center justify-center rounded-sm"
					>
						<IndianRupee className="size-6" />
						<Plus className="size-4" />
					</TxnButton> */}
                </div>
            </SignedIn>
        </Background>
    );
}
