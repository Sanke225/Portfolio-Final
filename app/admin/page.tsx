import type { Metadata } from "next";
import PortfolioAdmin from "@/components/admin/PortfolioAdmin";

export const metadata: Metadata = {
  title: "Admin Portfolio",
  description: "Panneau d'administration du portfolio",
};

export default function AdminPage() {
  return <PortfolioAdmin />;
}
