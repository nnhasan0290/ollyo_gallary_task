export enum ReducerActionKind {
  DELETEITEM = "DELETEITEM",
  MOVEITEM = "MOVEITEM",
  SELECTITEM = "SELECTITEM",
}

export interface ReducerAction {
  type: ReducerActionKind;
  payload: any;
}

export interface InitialState {
  data: {
    id: string;
    image: string;
    selected: boolean;
    previousPos: number | null;
  }[];
}

export interface ContextInitial {
  state: InitialState;
  dispatch: any;
}
