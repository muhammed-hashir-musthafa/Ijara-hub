export const nextAuthProxy = async (req: RequestInfo, init?: RequestInit) => {
  const url = (typeof req === "string" ? req : req.url).replace(
    "/api/auth/",
    "/api/oauth/"
  );
  return fetch(url, init);
};
