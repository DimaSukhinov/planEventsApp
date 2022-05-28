const initialState = {
    isLoggedIn: false,
    error: null as string | null,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) => {
    return {type: 'SET-IS-LOGGED-IN', value} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: 'SET-ERROR', error} as const
}

type ActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppErrorAC>
