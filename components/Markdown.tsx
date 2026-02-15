'use client';

/* @/styles files in global.css */
import styles from "./Markdown.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import MarkdownPre from "./MarkdownPre";
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "@/contexts/ThemeProvider";

/**
 * [Issue] mismatch error 발생(개발 간헐적, 배포 항상)
 * rehype-prism-plus
 * => 다른 라이브러리로 대체
 * => 테마 전환 시 유사 에러 발생
 * => theme 저장 방식을 localhost 가 아닌 cookie 로 변경
 */

interface MarkdownProps {
  className?: string;
  customStyle?: React.CSSProperties,
  codeTagProps?: { style: React.CSSProperties; },
  children: string;
}
export default function Markdown({
  className,
  customStyle,
  codeTagProps,
  children
}: MarkdownProps) {
  const { themeState } = useTheme();
  const optionalClass = className ? ` ${className}` : ``;

  return (
    <div className={`${styles.markdown}${optionalClass}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: MarkdownPre,
          p: ({ children }) => <div>{children}</div>,
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                showLineNumbers
                style={themeState ? oneDark : oneLight}
                language={match[1]}
                customStyle={customStyle}
                codeTagProps={codeTagProps}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>{children}</code>
            );
          }
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}