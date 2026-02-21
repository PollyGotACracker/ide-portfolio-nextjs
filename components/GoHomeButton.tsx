"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { PATHS } from "@/constants/path";
import { BUTTON_TEXTS } from "@/constants/string";

export default function GoHomeButton() {
  // DO NOT USE usePanel
  const router = useRouter();
  return (
    <Button onClick={() => router.push(PATHS.HOME)}>{BUTTON_TEXTS.HOME}</Button>
  );
}
