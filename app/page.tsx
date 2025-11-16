import { redirect } from "next/navigation";
import { translationConfig } from "./config";

export default function RootPage() {
  redirect(`/${translationConfig.defaultLocale}`);
}
