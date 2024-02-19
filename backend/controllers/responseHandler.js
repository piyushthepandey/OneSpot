export const getResponse = (data, res, statusCode = 200) => {
  res.status(statusCode).json(data);
};

export const getErrorResponse = (err, res) => {
  const statusCode = err.statusCode || 500;
  const message =
    err.message ||
    `Error Occured while processing your request with status code ${statusCode}`;
  res.status(statusCode).json({
    code: "Service Error",
    message,
  });
};
