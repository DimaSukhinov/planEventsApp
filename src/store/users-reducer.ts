const initialState: UsersType[] = []

export const usersReducer = (state: UsersType[] = initialState, action: ActionsType): UsersType[] => {
    switch (action.type) {
        case 'SET-USERS':
            return action.user.map(e => {
                return {...e}
            })
        default:
            return state
    }
}

export const setUsersAC = (user: UsersType[]) => {
    return {type: 'SET-USERS', user} as const
}

type ActionsType = ReturnType<typeof setUsersAC>

export type UsersType = {
    id: number
    userName: string
    isAccepted: boolean | null
}
