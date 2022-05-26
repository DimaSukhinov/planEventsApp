const initialState: GiftsType[] = [
    {id: 1111, eventId: 1, title: 'Флаг', status: true, quantity: 100},
    {id: 1112, eventId: 1, title: 'Листик', status: false, quantity: 40},
]

export const giftsReducer = (state: GiftsType[] = initialState, action: ActionsType): GiftsType[] => {
    switch (action.type) {
        case 'ADD-GIFT':
            return [...state, {
                id: 1113,
                eventId: 1,
                title: action.title,
                status: false,
                quantity: action.quantity
            }]
        default:
            return state
    }
}

export const addGiftAC = (title: string, quantity: number | null) => {
    return {type: 'ADD-GIFT', title, quantity} as const
}

type ActionsType = ReturnType<typeof addGiftAC>

export type GiftsType = {
    id: number
    eventId: number
    title: string
    status: boolean
    quantity: number | null
}
