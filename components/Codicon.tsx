import styles from "./Codicon.module.css";
import { cn } from "@/utils/cn";

interface CodiconProps extends React.ComponentPropsWithoutRef<"i"> {
  /** codicon 이름 */
  name: string;
  /** 추가 클래스명 */
  className?: string;
}
export default function Codicon({ name, className, ...props }: CodiconProps) {
  return (
    <i
      className={cn(styles.codicon, `codicon codicon-${name}`, className)}
      {...props}
    />
  );
}
