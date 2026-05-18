import ActiveIdProvider from "@/providers/ActiveIdProvider";
import MainLayout from "@/components/layouts/MainLayout";
/*
1. layout 은 server component 로 만들어 놓을 것
2. client component에서 server component를 직접 import 하면 에러 발생하므로 
    props 사용 => 상위 server component에서 import 하여 특정 prop 또는 children 으로 전달
*/
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ActiveIdProvider>
      <MainLayout>{children}</MainLayout>
    </ActiveIdProvider>
  );
}
