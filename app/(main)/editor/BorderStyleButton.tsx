import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";
import React from "react";

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyles);

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

function BorderStyleButton({ borderStyle, onChange }: BorderStyleButtonProps) {
  function handleClick() {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;

    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

  return (
    <Button
      variant="secondary"
      size="icon"
      title="Toggle Border Style"
      onClick={handleClick}
      className="hover:bg-secondary cursor-pointer transition-transform hover:translate-x-1.5"
    >
      <Icon className="size-5" />
    </Button>
  );
}

export default BorderStyleButton;
