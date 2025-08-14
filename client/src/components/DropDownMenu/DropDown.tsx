import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowBigDown, DotIcon } from "lucide-react";
import { useState } from "react";

export function DropdownMenuImportance() {
  const [position, setPosition] = useState("Importance");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {position} <ArrowBigDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="High">High</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Medium">Medium</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Low">Low</DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="Urgent">Urgent</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Lead">Lead</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Internal">
            Internal
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropdownMenuCardOptions() {
  const [position, setPosition] = useState("...");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{position}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="Delete">Delete</DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="Edit">Edit</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
