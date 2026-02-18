'use client';

import { useRouter } from "next/navigation";
import Button from "./Button";
import { PATHS } from "@/constants/path";


export default function GoHomeButton() {
  // DO NOT USE usePanel
  const router = useRouter();
  return (
    <Button onClick={() => router.push(PATHS.HOME)}>홈으로</Button>
  );
}