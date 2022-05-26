const initialState: UsersType[] = [
    {id: 11, userName: 'Pulse'},
    {id: 12, userName: 'Clash Maksimovna'},
    {id: 13, userName: 'Mute'},
]

export const usersReducer = (state: UsersType[] = initialState, action: ActionsType): UsersType[] => {
    switch (action.type) {

        default:
            return state
    }
}

export const addEventAC = (title: string, date: any) => {
    return {type: 'ADD-EVENT', title, date} as const
}

type ActionsType = ReturnType<typeof addEventAC>

export type UsersType = {
    id: number
    userName: string
}