import styles from "./Markdown.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

export default function Markdown({ className, children }: { className?: string; children: string; }) {
  return (
    <div className={`${styles.markdown}${className ? ` ${className}` : ``}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: ({ children }) => <span>{children}</span> }} >
        {children}
      </ReactMarkdown>
    </div>
  );
}