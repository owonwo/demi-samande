import Logo from "../../public/images/assets/logo-stacked-dark.svg";

export function Footer() {
  return (
    <footer className="py-24 bg-base-50 bg-gradient-to-b from-base-100 to-white">
      <div
        style={{ fontSize: "0.87rem" }}
        className={
          "container flex gap-8 flex-col items-center justify-center mx-auto"
        }
      >
        <img {...Logo} alt={"Demi Samande"} className={"w-[150px]"} />
        <p>COPYRIGHT &copy; {new Date().getFullYear()}. ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
}
