import { generateRandomColor, getContrastingColor } from "@/color";
import { Shuffle } from "@phosphor-icons/react";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

const PRESET_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FF9F1C",
  "#2AB7CA",
  "#FED766",
  "#4CB944",
  "#6C5B7B",
  "#355C7D",
  "#F67280",
  "#2A363B",
];

interface ColorPickerProps {
  selectedColor?: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker({
  selectedColor,
  onColorChange,
}: ColorPickerProps) {
  const [inputColor, setInputColor] = useState(selectedColor ?? "#fff");

  const handleColorChange = (color: string) => {
    setInputColor(color);
    onColorChange(color);
  };

  const handleRandomize = () => {
    const newColor = generateRandomColor();
    handleColorChange(newColor);
  };

  return (
    <Flex direction="column" gap="2">
      <Text as="div" size="2" weight="bold">
        Color
      </Text>
      <Flex gap="2" align="center">
        <div
          className="w-7 h-7 rounded-md border border-[var(--gray-a6)] flex items-center justify-center"
          style={{
            backgroundColor: inputColor,
            color: getContrastingColor(inputColor),
          }}
        >
          <span className="text-xs">Aa</span>
        </div>
        <Button
          variant="soft"
          className="px-3"
          title="Random color"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleRandomize();
          }}
        >
          <Shuffle size={16} />
        </Button>
        <TextField.Root
          className="flex-1 uppercase"
          placeholder="Enter a hex color"
          value={inputColor}
          readOnly
        ></TextField.Root>
      </Flex>
    </Flex>
  );
}
