'use client';

import { usePanel } from "@/contexts/PanelProvider";
import Button from "./Button";


export default function GoHomeButton() {
  const { goHome } = usePanel();
  return (
    <Button onClick={goHome}>홈으로</Button>
  );
}