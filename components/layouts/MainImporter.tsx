import PanelProvider from '@/contexts/PanelProvider';
import MainLayout from '@/components/layouts/MainLayout';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Explorer from '@/components/Explorer';
import SourceControl from '@/components/SourceControl';
import Search from '@/components/Search';
import Extensions from '@/components/Extensions';
import FontSizeProvider from '@/contexts/FontSizeProvider';
import ThemeProvider from '@/contexts/ThemeProvider';

export default function MainImporter({ children }: { children: React.ReactNode; }) {
  const sidebarProps = {
    explorer: <Explorer />,
    sourceControl: <SourceControl />,
    search: <Search />,
    extensions: <Extensions />
  };

  return (
    <ThemeProvider>
      <FontSizeProvider>
        <PanelProvider>
          <MainLayout
            sidebar={<Sidebar {...sidebarProps} />}
            footer={<Footer />}>
            {children}
          </MainLayout>
        </PanelProvider>
      </FontSizeProvider>
    </ThemeProvider>
  );
}