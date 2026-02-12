'use client';

import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/path";
import Button from "./Button";

export default function GoHomeButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(PATHS.HOME)}>홈으로</Button>
  );
}