import MainLayoutInner from "./MainLayoutInner";
import SidePanel from "./SidePanel";
import BottomPanel from "./BottomPanel";
import FooterFetched from "./FooterFetched";
import Explorer from "@/features/panel/Explorer";
import SourceControlFetched from "@/features/panel/SourceControlFetched";
import Search from "@/features/panel/Search";
import Extensions from "@/features/panel/Extensions";
import Problems from "@/features/panel/Problems";
import Output from "@/features/panel/Output";
import Terminal from "@/features/panel/Terminal";

/**
 * fetch 를 수행하는 비동기 서버 컴포넌트가
 * 404 페이지에서 css 스타일이 적용되지 않음
 * 따라서 데이터 요청부는 별도의 Wrapper 서버 컴포넌트로 분리한 후,
 * 기존 컴포넌트는 클라이언트 컴포넌트로 전환하였음
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sideProps = {
    explorer: <Explorer />,
    sourceControl: <SourceControlFetched />,
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
      footer={<FooterFetched />}
    >
      {children}
    </MainLayoutInner>
  );
}
