import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Scrims Overwatch" },
    { name: "description", content: "Setup scrim matches against people your rank in Overwatch 2!" },
  ];
};

export default function Index() {
  return (
    <div className="flex justify-center" style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="m-[1rem] text-[32pt]">Scrims Overwatch</h1>
    </div>
  );
}
