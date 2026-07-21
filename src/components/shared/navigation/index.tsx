import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ArrowRight, UserKeyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { USER_ROLE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/__root";
import { NavLink } from "./nav-link";
import { Logo } from "./site-logo";

export function Navbar() {
    const { auth, config } = Route.useRouteContext();
    const location = useLocation();
    const isAdmin = auth?.role === USER_ROLE.ADMIN;

    return (
        <header
            className={cn(
                "sticky inset-x-0 top-0 z-99 px-4 items-center flex transition-colors duration-400 ease-in-out h-16",
                "bg-linear-to-r from-background via-card/90 to-background/90",
            )}
        >
            <nav className="flex items-center justify-between container w-full h-full py-4 md:py-2">
                <Link to={"/"} className="w-20 h-full relative hidden md:flex">
                    <Logo />
                </Link>
                <div className="flex items-center justify-center gap-6 md:gap-8 pt-1 md:pt-0 text-primary-foreground">
                    <NavLink
                        href="/"
                        title="Home"
                        icon={
                            <Image
                                src={"/home.png"}
                                width={32}
                                height={32}
                                alt="logo-1"
                                className="md:hidden"
                            />
                        }
                    />
                    <SignedIn>
                        <NavLink
                            href="/dashboard"
                            title="Dashboard"
                            icon={
                                <Image
                                    src={"/layout.png"}
                                    width={28}
                                    height={28}
                                    alt="logo-1"
                                    className="md:hidden"
                                />
                            }
                        />
                    </SignedIn>
                    <NavLink
                        href={`/cultural/${config.activeYear}`}
                        title="Cultural"
                        partial="/cultural/"
                        icon={
                            <Image
                                src={"/hindu.png"}
                                width={36}
                                height={36}
                                alt="logo-3"
                                className="md:hidden"
                            />
                        }
                    />
                    <NavLink
                        href={`/temple/${config.activeYear}`}
                        title="Temple"
                        partial="/temple/"
                        icon={
                            <Image
                                src={"/temple.png"}
                                width={40}
                                height={32}
                                alt="logo-2"
                                className="md:hidden pb-1"
                            />
                        }
                    />
                </div>
                <SignedIn>
                    <UserButton>
                        <UserButton.MenuItems>
                            {isAdmin && (
                                <UserButton.Link
                                    label="Admin"
                                    labelIcon={<UserKeyIcon />}
                                    href="/admin"
                                />
                            )}
                            <UserButton.Action label="signOut" />
                        </UserButton.MenuItems>
                    </UserButton>
                </SignedIn>
                <SignedOut>
                    {!location.pathname.endsWith("annadaan") &&
                        !location.pathname.endsWith("itemized") && (
                            <div className="flex items-center gap-4">
                                <Button size={"sm"} asChild>
                                    <Link
                                        to="/sign-in/$"
                                        className="flex items-center"
                                    >
                                        Login <ArrowRight />
                                    </Link>
                                </Button>
                            </div>
                        )}
                </SignedOut>
            </nav>
        </header>
    );
}
