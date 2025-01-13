export const detectLocale = (req: {
  headers: { "accept-language"?: string };
}) => {
  const acceptLanguage = req.headers["accept-language"];
  return acceptLanguage?.split(",")[0] ?? "en";
};
