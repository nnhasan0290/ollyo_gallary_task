export enum ReducerActionKind {
    DELETEITEM = 'DELETEITEM',
    MOVEITEM = 'MOVEITEM'
}

export interface ReducerAction {
    type: ReducerActionKind,
    payload: any
}

export interface InitialState {
   data: {
    id: string,
    image: string
   }[]
}

export interface ContextInitial {
    state: InitialState,
    dispatch: any
}