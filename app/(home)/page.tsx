import GithubUser from "@/components/GithubUser";
import Profile from "./_components/Profile";
import Skills from "./_components/Skills";
import Projects from "./_components/Projects";

export default function Home() {
  const name = process.env.NEXT_PUBLIC_NAME;
  const email = process.env.NEXT_PUBLIC_EMAIL;

  return (
    <>
      <section>
        <div>{name}</div>
        <div>{email}</div>
        <GithubUser />
      </section>
      <Profile />
      <Skills />
      <Projects />
    </>
  );
}
