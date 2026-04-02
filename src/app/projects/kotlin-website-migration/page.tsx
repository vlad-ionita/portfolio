import type { Metadata } from "next";
import KotlinWebsiteMigrationContent from "@/components/KotlinWebsiteMigrationContent";

export const metadata: Metadata = {
  title: "Kotlin Website Migration",
};

export default function KotlinWebsiteMigrationPage() {
  return <KotlinWebsiteMigrationContent />;
}
