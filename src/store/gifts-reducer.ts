const initialState: GiftsType[] = []

export const giftsReducer = (state: GiftsType[] = initialState, action: ActionsType): GiftsType[] => {
    switch (action.type) {
        case 'SET-GIFTS':
            return action.gift.map(g => {
                return {...g}
            })
        case 'CHANGE-GIFT-STATUS':
            return state.map(g => g.id === action.eventId ? {...g, status: action.status} : g)
        default:
            return state
    }
}

export const setGiftsAC = (gift: GiftsType[]) => {
    return {type: 'SET-GIFTS', gift} as const
}
export const changeGiftStatusAC = (status: boolean, eventId: number) => {
    return {type: 'CHANGE-GIFT-STATUS', status, eventId} as const
}

type ActionsType = ReturnType<typeof setGiftsAC> | ReturnType<typeof changeGiftStatusAC>

export type GiftsType = {
    id: number
    eventId: number
    title: string
    status: boolean
    quantity: number
}
