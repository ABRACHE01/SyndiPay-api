class ErrorHandler {
  static notFound = (req, res, next) => {
    const error = new Error("Not Found 404");
    error.status = 404;
    next(error);
  };

  static handle = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message,
      },
    });
  };
}

module.exports = ErrorHandler;
