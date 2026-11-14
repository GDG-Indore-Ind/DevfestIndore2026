import { z } from "zod";
import Ajv from "ajv";

// Match the existing draft-07 format checks during the migration. Zod's URL
// and datetime parsers otherwise accept and reject different edge cases.
const formats = new Ajv({ format: "full" });
export const isUri = formats.compile({ type: "string", format: "uri" });
export const isDate = formats.compile({ type: "string", format: "date" });
export const isDateTime = formats.compile({ type: "string", format: "date-time" });
export const isEmail = formats.compile({ type: "string", format: "email" });

/** Shared field contracts for the canonical content files. */
export const id = z.string().regex(/^[a-z0-9][a-z0-9-]*$/);
export const text = z.string().min(1);
export const dimension = z
  .number()
  .refine(Number.isInteger, "Expected an integer")
  .meta({ type: "integer" })
  .min(1);

/** A syntactically valid HTTPS URL. */
export const httpsUrl = z
  .string()
  .regex(/^https:\/\//)
  .refine(isUri, "Invalid URI")
  .meta({ format: "uri" });

/** A calendar-date-shaped value (the JSON Schema contract is format-agnostic). */
export const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

/** Root-relative image path with at least one character after the leading slash. */
export const localImagePath = z.string().regex(/^\/[^/]/);
