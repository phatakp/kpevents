import { Image } from "@unpic/react";

type Props = {
    className?: string;
};

export function Logo(_: Props) {
    return (
        <div className="flex items-center">
            <Image src={"/calendar.png"} width={35} height={35} alt="logo-1" />
            <Image
                src={"/logo.png"}
                width={100}
                height={50}
                alt="logo-2"
                className="-ml-1"
            />
        </div>
    );
}
