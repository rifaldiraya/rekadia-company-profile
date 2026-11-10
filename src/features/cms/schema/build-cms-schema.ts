import * as yup from "yup";
import type { CmsField, CmsResource } from "@/features/cms/types/cms";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

const requiredMessage = (field: CmsField) => `${field.label} is required`;

const isFilled = (value: unknown) => {
  if (Array.isArray(value)) return value.length > 0;
  return value !== undefined && value !== null && String(value).trim() !== "";
};

const baseSchema = (field: CmsField): yup.AnySchema => {
  switch (field.type) {
    case "boolean":
      return yup.boolean().default(false);
    case "multiselect": {
      const schema = yup.array(yup.string().required()).default([]);
      return field.required ? schema.min(1, `Pick at least one ${field.label.toLowerCase()}`) : schema;
    }
    case "media":
    case "reference":
    case "select":
      return yup.string().nullable();
    default: {
      let schema = yup.string().trim();
      if (field.maxLength) schema = schema.max(field.maxLength, `${field.label} must be at most ${field.maxLength} characters`);
      if (field.type === "url") schema = schema.url("Enter a valid URL, starting with https://");
      if (field.type === "email") schema = schema.email("Enter a valid email address");
      if (field.type === "slug") schema = schema.matches(SLUG_PATTERN, { message: "Use lowercase letters, numbers, and dashes", excludeEmptyString: true });
      if (field.type === "html" && field.required) {
        schema = schema.test("html-required", requiredMessage(field), (value) => !value || stripHtml(value) !== "");
      }
      return schema;
    }
  }
};

const withRequired = (field: CmsField, schema: yup.AnySchema): yup.AnySchema => {
  if (field.type === "multiselect" || field.type === "boolean") return schema;
  if (field.required) return schema.test("required", requiredMessage(field), isFilled);
  if (field.requiredWhen) {
    const { field: dependency, equals } = field.requiredWhen;
    return schema.test("required-when", requiredMessage(field), function check(value) {
      return this.parent[dependency] !== equals || isFilled(value);
    });
  }
  return schema;
};

export const buildCmsSchema = (resource: CmsResource) => {
  const shape: Record<string, yup.AnySchema> = {
    status: yup.mixed<"draft" | "published">().oneOf(["draft", "published"]).required(),
    order: yup.number().typeError("Order must be a number").integer().min(0).required("Order is required"),
  };
  resource.fields.forEach((field) => {
    shape[field.name] = withRequired(field, baseSchema(field));
  });

  let schema = yup.object(shape);
  resource.requireOneOf?.forEach((group) => {
    const labels = group.map((name) => resource.fields.find((field) => field.name === name)?.label ?? name);
    schema = schema.test("require-one-of", function check(values) {
      const record = (values ?? {}) as Record<string, unknown>;
      if (group.some((name) => isFilled(record[name]))) return true;
      return this.createError({ path: group[0], message: `Fill in ${labels.join(" or ")}` });
    });
  });
  return schema;
};
