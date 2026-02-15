import PanelProvider from '@/contexts/PanelProvider';
import MainLayout from '@/components/layouts/MainLayout';
import SidePanel from '@/components/SidePanel';
import BottomPanel from '@/components/BottomPanel';
import Explorer from '@/components/Explorer';
import SourceControl from '@/components/SourceControl';
import Search from '@/components/Search';
import Extensions from '@/components/Extensions';
import Problems from "@/components/Problems";
import Output from "@/components/Output";
import Terminal from "@/components/Terminal";
import Footer from '@/components/Footer';

export default function MainImporter({ children }: { children: React.ReactNode; }) {
  const sideProps = {
    explorer: <Explorer />,
    sourceControl: <SourceControl />,
    search: <Search />,
    extensions: <Extensions />
  };
  const bottomProps = {
    problems: <Problems />,
    output: <Output />,
    terminal: <Terminal />,
  };

  return (
    <PanelProvider>
      <MainLayout
        aside={<SidePanel {...sideProps} />}
        bottom={<BottomPanel {...bottomProps} />}
        footer={<Footer />}
      >
        {children}
      </MainLayout>
    </PanelProvider>
  );
}