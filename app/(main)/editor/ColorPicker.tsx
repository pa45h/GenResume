import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaletteIcon } from "lucide-react";
import React, { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

const colors = [
  "#0A0A0A",
  "#991010",
  "#8E1350",
  "#52239A",
  "#0F3C8A",
  "#3A3A3A",
  "#0E612D",
  "#9C3E05",
  "#0A6A76",
  "#8A6B00",
];

function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          title="Change Resume Color"
          onClick={() => setShowPopover(true)}
          className="hover:bg-secondary hover:translate-x-1.5 cursor-pointer transition-transform"
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker
          color={color}
          onChange={onChange}
          triangle="top-right"
          colors={colors}
        />
      </PopoverContent>
    </Popover>
  );
}

export default ColorPicker;
