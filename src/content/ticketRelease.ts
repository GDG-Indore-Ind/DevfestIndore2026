import { PUBLIC_PASSES, type PublicPass } from "@/content/tickets";
// Show the open release(s), or the next release during a gap. Before 24 Oct,
// this previews Liftoff only. Alpha Drop is a historical booking category.
export function getVisiblePasses(now: number): readonly PublicPass[] {
  const open = PUBLIC_PASSES.filter((pass) => now >= Date.parse(pass.opensAt) && now <= Date.parse(pass.closesAt));
  if (open.length)
    return open;
  const next = PUBLIC_PASSES.find((pass) => now < Date.parse(pass.opensAt));
  return next ? PUBLIC_PASSES.filter((pass) => pass.opensAt === next.opensAt) : [];
}
