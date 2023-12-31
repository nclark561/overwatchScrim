import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import MenuButton from "~/components/buttons/MenuButton";
import styles from "~/styles/_index.module.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Scrims Overwatch" },
    {
      name: "description",
      content: "Setup scrim matches against people your rank in Overwatch 2!",
    },
  ];
};

export default function Index() {
  return (
    <div
      className="flex justify-center items-center w-[100vw]"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <Link to="/AuthTest" className="mx-[1rem]" prefetch="intent">
        test
      </Link>
    </div>
  );
}
