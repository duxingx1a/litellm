"use client";

import NewUsagePage from "@/components/UsagePage/components/UsagePageView";
import useAuthorized from "@/app/(dashboard)/hooks/useAuthorized";

export default function UsagePage() {
  useAuthorized();
  return <NewUsagePage teams={[]} organizations={[]} />;
}
