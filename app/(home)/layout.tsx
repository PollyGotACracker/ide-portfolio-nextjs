import Terminal from "@/components/Terminal";

export default function HomeLayout({ children }: { children: React.ReactNode; }) {
  return (
    <>
      <>{children}</>
      <Terminal />
    </>
  );
}