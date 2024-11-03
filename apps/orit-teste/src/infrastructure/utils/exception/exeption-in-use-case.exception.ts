export class ExceptionInUseCase extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExceptionInUseCase';
  }
}
