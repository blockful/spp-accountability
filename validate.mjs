import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFileSync } from "fs";

const schema = JSON.parse(readFileSync("providers.schema.json", "utf8"));
const data = JSON.parse(readFileSync("providers.json", "utf8"));

// --- Schema validation ---

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

if (!validate(data)) {
  console.error("Schema validation failed:");
  for (const err of validate.errors) {
    console.error(`  ${err.instancePath || "/"}: ${err.message}`);
  }
  process.exit(1);
}
console.log("✓ Schema validation passed");

// --- Cross-referential checks ---

const errors = [];
const programKeys = new Set(Object.keys(data.programs));

// All program quarters collected for report key validation
const allQuarters = new Set();
for (const program of Object.values(data.programs)) {
  for (const q of program.year1Quarters ?? []) allQuarters.add(q);
  for (const q of program.year2Quarters ?? []) allQuarters.add(q);
}

// Check unique slugs
const slugs = data.providers.map((p) => p.slug);
const seen = new Set();
for (const slug of slugs) {
  if (seen.has(slug)) errors.push(`Duplicate slug: "${slug}"`);
  seen.add(slug);
}

for (const provider of data.providers) {
  const { slug } = provider;

  // Provider program keys must reference defined programs
  for (const key of Object.keys(provider.programs)) {
    if (!programKeys.has(key)) {
      errors.push(`${slug}: references undefined program "${key}"`);
    }
  }

  // Report keys must match a quarter defined in some program
  for (const key of Object.keys(provider.reports)) {
    if (!allQuarters.has(key)) {
      errors.push(
        `${slug}: report "${key}" doesn't match any program quarter`,
      );
    }
  }

  // streamDuration: 2 only makes sense if the program has year2Quarters
  for (const [programKey, entry] of Object.entries(provider.programs)) {
    const program = data.programs[programKey];
    if (
      entry.streamDuration === 2 &&
      program &&
      (!program.year2Quarters || program.year2Quarters.length === 0)
    ) {
      errors.push(
        `${slug}: streamDuration 2 in ${programKey} but program has no year2Quarters`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error("Cross-validation failed:");
  for (const err of errors) console.error(`  ${err}`);
  process.exit(1);
}
console.log("✓ Cross-validation passed");

console.log(
  `\n  ${Object.keys(data.programs).length} programs, ${data.providers.length} providers, ${data.providers.reduce((n, p) => n + Object.keys(p.reports).length, 0)} reports`,
);
