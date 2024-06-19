export abstract class ApiResult<T> {
  protected constructor(public readonly type: ResultType) {}

  static isSuccess<T>(result: ApiResultType<T>): result is Success<T> {
    return result instanceof Success;
  }

  static isError<T>(result: ApiResultType<T>): result is Failure<T> {
    return result instanceof Failure;
  }
}

export class Success<T> extends ApiResult<T> {
  constructor(public readonly data: T) {
    super(ResultType.SUCCESS);
  }
}

export class Failure<T> extends ApiResult<T> {
  constructor(public readonly message: string) {
    super(ResultType.FAILURE);
  }
}

export enum ResultType {
  SUCCESS,
  FAILURE,
}

export type ApiResultType<T> = Success<T> | Failure<T>;
