export default function errorsHandler(err, req, res, next) {
  res.status(err.code ?? 500);
  res.json({
    status: "KO",
    message: err.message,
  });
}
