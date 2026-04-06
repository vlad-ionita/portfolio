import type { Metadata } from "next";
import JobApplicationTrackerContent from "@/components/page-content/JobApplicationTrackerContent";

export const metadata: Metadata = {
  title: "Job Application Tracker",
};

export default function JobApplicationTrackerPage() {
  return <JobApplicationTrackerContent />;
}
