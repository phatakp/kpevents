import { Link } from "@tanstack/react-router";
import {
    Tabs,
    TabsContent,
    TabsContents,
    TabsList,
    TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import { COMMITTEE } from "@/lib/constants";
import { capitalise } from "@/lib/utils";
import { COMMITTEE_OPTIONS } from "@/zod/common.schema";
import { CommitteeContent } from "./committee-content";

export function CommitteeTabs() {
    return (
        <div className="w-full max-w-3xl mx-auto">
            <Tabs defaultValue={COMMITTEE.CULTURAL}>
                <TabsList>
                    {COMMITTEE_OPTIONS.map((committee) => (
                        <TabsTrigger key={committee} value={committee} asChild>
                            <Link to="/dashboard" search={{ committee }}>
                                {capitalise(committee)}
                            </Link>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContents className="py-6">
                    {COMMITTEE_OPTIONS.map((committee) => (
                        <TabsContent
                            key={committee}
                            value={committee}
                            className="flex flex-col gap-6"
                        >
                            <CommitteeContent committee={committee} />
                        </TabsContent>
                    ))}
                </TabsContents>
            </Tabs>
        </div>
    );
}
