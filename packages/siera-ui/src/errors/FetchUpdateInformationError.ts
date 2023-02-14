export class FetchUpdateInformationError extends Error {
  public constructor(message: string) {
    super(message)
    this.name = 'FetchUpdateInformationError'
  }
}
