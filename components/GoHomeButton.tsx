"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { PATHS } from "@/constants/path";
import { BUTTON_TEXTS } from "@/constants/string";
import { Home } from "pixelarticons/react";

export default function GoHomeButton() {
  // DO NOT USE usePanel
  const router = useRouter();
  return (
    <Button onClick={() => router.push(PATHS.HOME)}>
      <Home width={16} />
      {BUTTON_TEXTS.HOME}
    </Button>
  );
}
