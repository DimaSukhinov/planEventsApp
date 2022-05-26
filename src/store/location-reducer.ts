const initialState: LocationsType[] = [
    {id: 111111, eventId: 1, title: 'Минск'},
    {id: 111112, eventId: 2, title: 'Варшава'},
    {id: 111113, eventId: 3, title: 'Прага'},
]

export const locationsReducer = (state: LocationsType[] = initialState, action: ActionsType): LocationsType[] => {
    switch (action.type) {

        default:
            return state
    }
}

export const addGiftAC = (title: string, price: number | null) => {
    return {type: 'ADD-GIFT', title, price} as const
}

type ActionsType = ReturnType<typeof addGiftAC>

export type LocationsType = {
    id: number
    eventId: number
    title: string
}