import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";

interface DropdownProps {
  onStatusChange: (status: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onStatusChange }) => {
  const handleStatusChange = (status: string) => {
    onStatusChange(status);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-yellow-600"
          onClick={() => handleStatusChange("Pending")}
        >
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-green-600"
          onClick={() => handleStatusChange("Delivered")}
        >
          Delivered
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => handleStatusChange("Cancelled")}
        >
          Cancelled
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
