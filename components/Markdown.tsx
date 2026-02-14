'use client';

/* @/styles files in global.css */
import styles from "./Markdown.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';
import MarkdownPre from "./MarkdownPre";

interface MarkdownProps {
  className?: string;
  transparent?: boolean;
  noMargin?: boolean;
  children: string;
}
export default function Markdown({
  className,
  transparent = false,
  noMargin = false,
  children
}: MarkdownProps) {
  const optionalClass = className ? ` ${className}` : ``;
  const transparentClass = transparent ? ` ${styles.transparent}` : ``;
  const noMarginClass = noMargin ? ` ${styles.no_margin}` : ``;

  return (
    <div className={`${styles.markdown}${transparentClass}${noMarginClass}${optionalClass}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypePrismPlus, { showLineNumbers: true }]]}
        components={{
          pre: MarkdownPre,
          p: ({ children }) => <div>{children}</div>
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

