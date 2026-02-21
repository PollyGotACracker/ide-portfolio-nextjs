import { BUTTON_TEXTS } from "@/constants/string";
import Button from "./Button";

export default function ErrResetButton({
  onClick,
}: {
  onClick: (e: React.SyntheticEvent) => unknown;
}) {
  return <Button onClick={onClick}>{BUTTON_TEXTS.RESET}</Button>;
}
