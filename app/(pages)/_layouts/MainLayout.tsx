import MainLayoutInner from "./MainLayoutInner";
import SidePanel from "./SidePanel";
import BottomPanel from "./BottomPanel";
import Footer from "./Footer";
import Explorer from "../_components/Explorer";
import SourceControl from "../_components/SourceControl";
import Search from "../_components/Search";
import Extensions from "../_components/Extensions";
import Problems from "../_components/Problems";
import Output from "../_components/Output";
import Terminal from "../_components/Terminal";

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
