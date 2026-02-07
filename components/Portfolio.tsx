import { PortfolioData } from "@/types/Data";

export default function Portfolio({ profile }: PortfolioData) {
  return (
    <>
      <div>{profile.about}</div>
    </>
  );
}