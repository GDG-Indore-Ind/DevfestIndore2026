import { permanentRedirect } from "next/navigation";
import LegacySpeakers from "@/components/directory/LegacySpeakers";
import { DIRECTORY_ACTIVE } from "@/lib/directoryAccess";
export default async function PastSpeakersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (DIRECTORY_ACTIVE) {
    const params = await searchParams;
    const query = new URLSearchParams();
    for (const key of ["year", "track", "q"])
      if (typeof params[key] === "string") query.set(key, params[key]);
    permanentRedirect(`/talks${query.size ? `?${query}` : ""}`);
  }
  return <LegacySpeakers />;
}
