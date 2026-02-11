// import styles from "./Main.module.css";

export default function Main() {
  const name = process.env.NEXT_PUBLIC_NAME;
  const email = process.env.NEXT_PUBLIC_EMAIL;

  return (
    <section>
      <div>{name}</div>
      <div>{email}</div>
    </section>
  );
}