// Custom API Error class
export class ApiError extends Error {
  constructor(message = "Something went wrong", status = 500) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}