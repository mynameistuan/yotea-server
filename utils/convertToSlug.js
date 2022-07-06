import slugify from "slugify";

export const convertToSlug = (text) => {
  return slugify(text, {
    lower: true,
    locale: "vi",
  });
};
