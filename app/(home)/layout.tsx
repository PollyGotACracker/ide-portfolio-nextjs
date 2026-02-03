import '@vscode/codicons/dist/codicon.css';
import Sidebar from "@/components/Sidebar";
import Terminal from "@/components/Terminal";

export default function HomeLayout({ children }: { children: React.ReactNode; }) {
  return (
    <>
      <Sidebar />
      <>{children}</>
      <Terminal />
    </>
  );
}