import { useNavigate } from "@tanstack/react-router";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    year: number;
};

export function SelectYear({ year }: Props) {
    const navigate = useNavigate();
    const years = Array.from(
        { length: 5 },
        (_, i) => new Date().getFullYear() - i,
    ).filter((y) => y >= 2025); // Only show years from 2025 onwards

    const handleSelect = (selectedYear: string) => {
        navigate({
            to: ".",
            params: (old) => ({
                ...old,
                year: Number(selectedYear),
            }),
        });
    };

    return (
        <InputGroup className="border-none h-9 md:w-fit">
            <InputGroupInput
                className="pe-0 text-xs text-muted-foreground"
                value={`Show Details for`}
                readOnly
            />
            <InputGroupAddon align={"inline-end"}>
                <Select onValueChange={handleSelect} value={year.toString()}>
                    <SelectTrigger className="w-full text-foreground">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {years.map((y) => (
                                <SelectItem key={y} value={y.toString()}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </InputGroupAddon>
        </InputGroup>
    );
}
