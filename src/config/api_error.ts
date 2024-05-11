export class APIError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = "API-Error";
  }
}
