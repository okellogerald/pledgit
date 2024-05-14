import { toast } from "react-toastify";
import { isError } from "./utils";
import { match } from "ts-pattern";

export interface InitialState {
  status: "initial";
}

export interface ErrorState {
  status: "error";
  errorMessage?: string;
}

export interface LoadingState {
  status: "loading";
  loadingMessage?: string;
}

export interface SuccessState<T> {
  status: "success";
  data: T;
}

export type AsyncState<T> =
  | InitialState
  | LoadingState
  | SuccessState<T>
  | ErrorState;

export async function trackPromise<T>(
  promise: Promise<T>,
  set: React.Dispatch<React.SetStateAction<AsyncState<T>>>,
  options?: {
    showErrorMessage?: boolean;
  }
): Promise<AsyncState<T>> {
  set({ status: "loading" });
  try {
    const result = await promise;
    const state: SuccessState<T> = { status: "success", data: result }
    set(state);
    return state
  } catch (error) {
    let state: ErrorState
    if (isError(error)) {
      state = { status: "error", errorMessage: error.message }
      let showMessage = options?.showErrorMessage === true || options?.showErrorMessage === undefined
      if (showMessage) toast.error(error.message)
    }
    state = { status: "error" }
    set(state);
    return state
  }
}

export function matchAsyncState<T, R>(
  data: AsyncState<T>,
  views: {
    otherwise: () => R,
    onInitial?: () => R,
    onLoading?: (msg?: string) => R,
    onError?: (msg?: string) => R,
    onSuccess?: (data: T) => R,
  },
): R {
  function showOther() { return views.otherwise(); }

  return match(data)
    .with({ status: "initial" }, function () {
      if (views.onInitial) return views.onInitial();
      return showOther()
    })
    .with({ status: "loading" }, function (r) {
      if (views.onLoading) return views.onLoading(r.loadingMessage);
      return showOther()
    })
    .with({ status: "error" }, function (r) {
      if (views.onError) return views.onError(r.errorMessage);
      return showOther()
    })
    .with({ status: "success" }, function (r) {
      if (views.onSuccess) return views.onSuccess(r.data);
      return showOther()
    })
    .otherwise(showOther)
}