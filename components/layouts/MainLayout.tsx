import MainLayoutInner from "./MainLayoutInner";
import SidePanel from "./SidePanel";
import BottomPanel from "./BottomPanel";
import Footer from "./Footer";
import Explorer from "@/features/panel/Explorer";
import SourceControl from "@/features/panel/SourceControl";
import Search from "@/features/panel/Search";
import Extensions from "@/features/panel/Extensions";
import Problems from "@/features/panel/Problems";
import Output from "@/features/panel/Output";
import Terminal from "@/features/panel/Terminal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sideProps = {
    explorer: <Explorer />,
    sourceControl: <SourceControl />,
    search: <Search />,
    extensions: <Extensions />,
  };
  const bottomProps = {
    problems: <Problems />,
    output: <Output />,
    terminal: <Terminal />,
  };

  return (
    <MainLayoutInner
      aside={<SidePanel {...sideProps} />}
      bottom={<BottomPanel {...bottomProps} />}
      footer={<Footer />}
    >
      {children}
    </MainLayoutInner>
  );
}
