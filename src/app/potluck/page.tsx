import type { Metadata } from "next";
import PotluckClient from "./PotluckClient";

export const metadata: Metadata = {
  title: "PC Potluck — Monday June 1st",
  description: "Sign up to bring something to the office potluck!",
};

export default function PotluckPage() {
  return <PotluckClient />;
}
