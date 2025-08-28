import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowBigDown, ArrowBigUp, ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import type { ImportanceFilter } from "../Types/types";

type DropdownImportanceProps = {
  value: string;
};

export function DropdownMenuImportance({ value }: DropdownImportanceProps) {
  const [position, setPosition] = useState("Importance");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {value ? value : position} <ArrowBigDown />
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

type DropdownSwitchStatusProps = {
  value: string;
  onChange: (newStatus: string) => void;
};

export const DropdownSwitchStatus = ({
  value,
  onChange,
}: DropdownSwitchStatusProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-xs">
          <ArrowLeftRight />
          Switch
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          <DropdownMenuRadioItem value="TODO">To Do</DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="IN_PROGRESS">
            In Progress
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="DONE">Done</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type DropdownSortProps = {
  value: string;
  onChangeSort: (sortStatusBy: string) => void;
};

export const DropdownSorting = ({ value, onChangeSort }: DropdownSortProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-xs">Sort by</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit">
        <DropdownMenuRadioGroup value={value} onValueChange={onChangeSort}>
          <DropdownMenuRadioItem value="none">
            Default order
          </DropdownMenuRadioItem>

          <DropdownMenuSeparator />

          <DropdownMenuRadioItem value="importanceDown">
            Importance <ArrowBigDown />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="importanceUp">
            Importance <ArrowBigUp />
          </DropdownMenuRadioItem>

          <DropdownMenuSeparator />

          <DropdownMenuRadioItem value="dateDown">
            Due Date <ArrowBigDown />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dateUp">
            Due Date <ArrowBigUp />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type DropdownFilterProps = {
  value: ImportanceFilter[];
  onChangeMultiFilter: (filter: ImportanceFilter[]) => void;
};

export const DropdownFilterStatus = ({
  value,
  onChangeMultiFilter,
}: DropdownFilterProps) => {
  const toggleValue = (filter: ImportanceFilter, checked: boolean) => {
    if (checked) {
      onChangeMultiFilter([...value, filter]);
    } else {
      onChangeMultiFilter(value.filter((v) => v !== filter));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-xs">Filter</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit">
        <DropdownMenuCheckboxItem
          checked={value.length === 0}
          onCheckedChange={() => onChangeMultiFilter([])}
        >
          Remove Filter
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={value.includes("High")}
          onCheckedChange={(checked) => toggleValue("High", checked)}
        >
          High
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={value.includes("Medium")}
          onCheckedChange={(checked) => toggleValue("Medium", checked)}
        >
          Medium
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={value.includes("Low")}
          onCheckedChange={(checked) => toggleValue("Low", checked)}
        >
          Low
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
