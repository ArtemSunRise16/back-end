module.exports = class ApiError extends Error {
  constructor(status, massege) {
    super();
    this.status = status;
    this.message = massege;
  }

  static notFound(massege) {
    return new ApiError(404, massege);
  }

  static badRequest(massege) {
    return new ApiError(400, massege);
  }

  static internal(massege) {
    return new ApiError(500, massege);
  }
};
