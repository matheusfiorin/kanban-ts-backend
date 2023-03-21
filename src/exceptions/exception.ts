export default class Exception extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    Object.setPrototypeOf(this, Exception.prototype);
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}