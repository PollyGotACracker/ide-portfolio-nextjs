import PanelProvider from '@/contexts/PanelProvider';
import MainLayout from '@/components/MainLayout';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Explorer from '@/components/Explorer';
import SourceControl from '@/components/SourceControl';
import Search from '@/components/Search';
import Extensions from '@/components/Extensions';
import FontSizeProvider from '@/contexts/FontSizeProvider';
import ThemeProvider from '@/contexts/ThemeProvider';

/*
1. layout 은 server component 로 만들어 놓을 것
2. client component에서 server component를 직접 import 하면 에러 발생하므로 
    props 사용 => 상위 server component에서 import 하여 특정 prop 또는 children 으로 전달
*/
export default function HomeLayout({ children }: { children: React.ReactNode; }) {
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