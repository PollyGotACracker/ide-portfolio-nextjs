import { BUTTON_TEXTS } from "@/constants/string";
import Button from "./Button";
import { Refresh } from "pixelarticons/react";

export default function ErrResetButton({
  onClick,
}: {
  onClick: (e: React.SyntheticEvent) => unknown;
}) {
  return (
    <Button onClick={onClick}>
      <Refresh width={16} />
      {BUTTON_TEXTS.RESET}
    </Button>
  );
}
