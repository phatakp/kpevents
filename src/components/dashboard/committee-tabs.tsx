import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { currDBUserQueryOptions } from "@/api/queries/user.queries";
import {
    Tabs,
    TabsContent,
    TabsContents,
    TabsList,
    TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import { COMMITTEE, TXN_TYPE } from "@/lib/constants";
import { MemberBalanceList } from "./members-balance-list";

type Props = {
    year: number;
    handleSelect: (year: string) => void;
};

export function CommitteeTabs({ year, handleSelect }: Props) {
    const { data: user } = useSuspenseQuery(currDBUserQueryOptions);
    const activeMemberShip = user?.memberships?.filter((m) => m.isActive) ?? [];
    if (activeMemberShip.length === 0) return;

    return (
        <div className="flex w-full max-w-3xl flex-col gap-6 mx-auto">
            {activeMemberShip.length === 1 ? (
                <MemberBalanceList
                    committee={activeMemberShip[0].committee}
                    type={TXN_TYPE.DONATION}
                    year={year}
                    handleSelect={handleSelect}
                    showOther
                />
            ) : (
                <Tabs defaultValue={COMMITTEE.CULTURAL}>
                    <TabsList>
                        <TabsTrigger value={COMMITTEE.CULTURAL} asChild>
                            <Link
                                to="/dashboard"
                                search={{ committee: COMMITTEE.CULTURAL }}
                            >
                                Cultural
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value={COMMITTEE.TEMPLE} asChild>
                            <Link
                                to="/dashboard"
                                search={{ committee: COMMITTEE.TEMPLE }}
                            >
                                Temple
                            </Link>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContents className="py-6">
                        <TabsContent
                            value={COMMITTEE.CULTURAL}
                            className="flex flex-col gap-6"
                        >
                            <MemberBalanceList
                                committee={COMMITTEE.CULTURAL}
                                type={TXN_TYPE.DONATION}
                                year={year}
                                handleSelect={handleSelect}
                                showOther
                            />
                        </TabsContent>
                        <TabsContent
                            value={COMMITTEE.TEMPLE}
                            className="flex flex-col gap-6"
                        >
                            <MemberBalanceList
                                committee={COMMITTEE.TEMPLE}
                                type={TXN_TYPE.DONATION}
                                year={year}
                                handleSelect={handleSelect}
                                showOther
                            />
                        </TabsContent>
                    </TabsContents>
                </Tabs>
            )}
        </div>
    );
}
