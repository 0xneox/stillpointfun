import path from "node:path";
import { fileURLToPath } from "node:url";
import { assertLaunchMetadata, validateContentRegistry } from "./content-registry.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicLaunch = process.env.PUBLIC_LAUNCH === "true";
assertLaunchMetadata(publicLaunch, !publicLaunch);
const registry = validateContentRegistry(root, { publicLaunch });

console.log(`Content registry: ${registry.all.length} documents`);
console.log(
  `Published/enabled: ${registry.published.length}; drafts or disabled types: ${registry.all.length - registry.published.length}`,
);
console.log(
  "Enabled types:",
  Object.entries(registry.config.content_types_enabled)
    .filter(([, enabled]) => enabled)
    .map(([type]) => type)
    .join(", "),
);
console.log(
  "Visible content navigation:",
  registry.navSections.length
    ? registry.navSections.map(({ label, count }) => `${label} (${count})`).join(", ")
    : "none",
);
for (const warning of registry.warnings) console.warn(`WARN: ${warning}`);
if (registry.issues.length > 0) {
  console.error("Content registry validation failed:");
  for (const issue of registry.issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log("Content registry validation passed.");
}
