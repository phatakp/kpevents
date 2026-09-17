import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ArrowRight, UserKeyIcon } from "lucide-react";
import { currDBUserQueryOptions } from "@/api/queries/user.queries";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { COMMITTEE, MEMBER_STATUS, USER_ROLE } from "@/lib/constants";
import { cn, getMemberStatus } from "@/lib/utils";
import { Route } from "@/routes/__root";
import type { MemberStatus } from "@/types";
import { NavLink } from "./nav-link";
import { Logo } from "./site-logo";

export function Navbar() {
    const { auth, config } = Route.useRouteContext();
    const { data: user, isLoading } = useQuery(currDBUserQueryOptions);
    const location = useLocation();
    const isAdmin = auth?.role === USER_ROLE.ADMIN;
    if (isLoading) return <Skeleton className="inset-x-0 h-16 absolute" />;
    let culturalMember: MemberStatus = MEMBER_STATUS.NON;
    let templeMember: MemberStatus = MEMBER_STATUS.NON;
    if (user) {
        culturalMember = getMemberStatus(user, COMMITTEE.CULTURAL);
        templeMember = getMemberStatus(user, COMMITTEE.TEMPLE);
    }
    const culturalLinks =
        culturalMember === MEMBER_STATUS.ACTIVE
            ? [
                  {
                      title: "Cultural Dashboard",
                      href: `/cultural/${config.activeYear}`,
                  },
                  {
                      title: "Cultural Transactions",
                      href: `/transactions/cultural/donation/${config.activeYear}`,
                  },
                  {
                      title: "Annadaan",
                      href: `/cultural/annadaan/${config.activeYear}`,
                  },
              ]
            : [
                  {
                      title: "Cultural Dashboard",
                      href: `/cultural/${config.activeYear}`,
                  },
                  {
                      title: "Annadaan",
                      href: `/cultural/annadaan/${config.activeYear}`,
                  },
              ];
    const templeLinks =
        templeMember === MEMBER_STATUS.ACTIVE
            ? [
                  {
                      title: "Temple Dashboard",
                      href: `/temple/${config.activeYear}`,
                  },
                  {
                      title: "Temple Transactions",
                      href: `/transactions/temple/donation/${config.activeYear}`,
                  },
                  {
                      title: "Item Bookings",
                      href: `/temple/temple/${config.activeYear}`,
                  },
              ]
            : [
                  {
                      title: "Temple Dashboard",
                      href: `/temple/${config.activeYear}`,
                  },
                  {
                      title: "Item Bookings",
                      href: `/temple/temple/${config.activeYear}`,
                  },
              ];

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
                    <SignedOut>
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
                    </SignedOut>
                    <SignedIn>
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
                            isDropdown
                            dropdownLinks={culturalLinks}
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
                            isDropdown
                            dropdownLinks={templeLinks}
                        />

                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size={"sm"}>
                                    <span className="hidden md:flex title font-semibold text-base font-sans">
                                        Cultural
                                    </span>
                                    <Image
                                        src={"/hindu.png"}
                                        width={36}
                                        height={36}
                                        alt="logo-3"
                                        className="md:hidden"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup className="pt-4">
                                    <DropdownMenuItem asChild>
                                        <Link
                                            to="/$committee/$year"
                                            params={{
                                                committee:
                                                    ROUTE_COMMITTEE.CULTURAL,
                                                year: config.activeYear,
                                            }}
                                        >
                                            Stats
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            to="/transactions/$committee/$type/$year"
                                            params={{
                                                committee:
                                                    ROUTE_COMMITTEE.CULTURAL,
                                                type: ROUTE_TXN_TYPE.DONATION,
                                                year: config.activeYear,
                                            }}
                                        >
                                            Cultural Transactions
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            to="/$committee/$subType/$year"
                                            params={{
                                                committee:
                                                    ROUTE_COMMITTEE.CULTURAL,
                                                subType:
                                                    ROUTE_SUB_TYPE.ANNADAAN,
                                                year: config.activeYear,
                                            }}
                                        >
                                            Annadaan Transactions
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size={"sm"}>
                                    <span className="hidden md:flex title font-semibold text-base font-sans">
                                        Temple
                                    </span>
                                    <Image
                                        src={"/temple.png"}
                                        width={40}
                                        height={32}
                                        alt="logo-2"
                                        className="md:hidden pb-1"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup className="pt-4">
                                    <DropdownMenuItem asChild>
                                        <Link
                                            to="/$committee/$year"
                                            params={{
                                                committee:
                                                    ROUTE_COMMITTEE.TEMPLE,
                                                year: config.activeYear,
                                            }}
                                        >
                                            Stats
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            to="/transactions/$committee/$type/$year"
                                            params={{
                                                committee:
                                                    ROUTE_COMMITTEE.TEMPLE,
                                                type: ROUTE_TXN_TYPE.DONATION,
                                                year: config.activeYear,
                                            }}
                                        >
                                            Temple Transactions
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            to="/$committee/$subType/$year"
                                            params={{
                                                committee:
                                                    ROUTE_COMMITTEE.TEMPLE,
                                                subType: ROUTE_SUB_TYPE.TEMPLE,
                                                year: config.activeYear,
                                            }}
                                        >
                                            Item Bookings
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </SignedIn>
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
