import { StoreEnhancer } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer;
  }
}

import { ThunkAction } from 'redux-thunk';

declare module 'redux' {
  export interface Dispatch<A extends Action = AnyAction> {
    <T extends ThunkAction<any, any, any, any>>(
      action: T,
    ): T extends ThunkAction<infer K, any, any, any> ? K : never;
  }
  export interface Action<T extends string, K> {
    type: T;
    payload: K;
  }
}
