export default function notFound(req, res, next) {
  res.status(404);
  res.json({
    status: "KO",
    message: "Page not found",
  });
}
