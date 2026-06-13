import { redirect } from "next/navigation";

export default function AccountRootPage() {
  // Automatically redirect the base /account URL to the dashboard
  redirect("/account/dashboard");
}
