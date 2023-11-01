enum ReducerActionKind {
    DELETEITEM = 'DELETEITEM',
}

export interface ReducerAction {
    type: ReducerActionKind,
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