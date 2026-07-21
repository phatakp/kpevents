import { useNavigate } from "@tanstack/react-router";
import { SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { useDebounce } from "@/hooks/use-debounce";

export function TxnSearchInput() {
    const [value, setValue] = useState("");
    const searchTerm = useDebounce(value, 500);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm)
            navigate({
                to: ".",
                search: (old) => ({ ...old, query: searchTerm }),
            });
    }, [searchTerm, navigate]);

    return (
        <InputGroup className="">
            <InputGroupInput
                className="bg-background text-sm"
                placeholder={`e.g. John Doe or D403 or Contractor Payment`}
                value={value ?? ""}
                onChange={(e) => setValue(e.target.value)}
            />
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            {value && (
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        variant="ghost"
                        onClick={() => {
                            setValue("");
                            navigate({
                                to: ".",
                                search: (old) => ({ ...old, query: undefined }),
                            });
                        }}
                    >
                        <X />
                    </InputGroupButton>
                </InputGroupAddon>
            )}
        </InputGroup>
    );
}
