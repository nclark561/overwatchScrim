import { Outlet, Link } from "@remix-run/react";
import MenuButton from "~/components/buttons/MenuButton";
import styles from "~/styles/_index.module.css";

export default function _base() {
  return (
    <main>
      <header className="flex justify-center items-center w-[100vw]">
        <h1 className={`m-[1rem] text-[32pt] ml-auto ${styles.title}`}>
          crm Overwatch
        </h1>
        <MenuButton />
      </header>
      <Outlet />
    </main>
  );
}
