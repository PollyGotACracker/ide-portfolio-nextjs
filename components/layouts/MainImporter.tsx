import PanelProvider from '@/contexts/PanelProvider';
import FontSizeProvider from '@/contexts/FontSizeProvider';
import ThemeProvider from '@/contexts/ThemeProvider';
import MainLayout from '@/components/layouts/MainLayout';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Explorer from '@/components/Explorer';
import SourceControl from '@/components/SourceControl';
import Search from '@/components/Search';
import Extensions from '@/components/Extensions';
import Problems from "@/components/Problems";
import Output from "@/components/Output";
import Terminal from "@/components/Terminal";

export default function MainImporter({ children }: { children: React.ReactNode; }) {
  const sidebarProps = {
    explorer: <Explorer />,
    sourceControl: <SourceControl />,
    search: <Search />,
    extensions: <Extensions />
  };
  const footerProps = {
    problems: <Problems />,
    output: <Output />,
    terminal: <Terminal />,
  };
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <PanelProvider>
          <MainLayout
            sidebar={<Sidebar {...sidebarProps} />}
            footer={<Footer {...footerProps} />}>
            {children}
          </MainLayout>
        </PanelProvider>
      </FontSizeProvider>
    </ThemeProvider>
  );
}