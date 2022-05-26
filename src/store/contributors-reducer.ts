const initialState: ContributorType[] = [
    {id: 11111111, eventId: 1, userId: 11, isAccepted: true},
    {id: 11111112, eventId: 1, userId: 12, isAccepted: false},
    {id: 11111113, eventId: 1, userId: 13, isAccepted: true},
]

export const contributorsReducer = (state: ContributorType[] = initialState, action: ActionsType): ContributorType[] => {
    switch (action.type) {

        default:
            return state
    }
}

export const addGiftAC = (title: string, price: number | null, quantity: number | null) => {
    return {type: 'ADD-GIFT', title, price, quantity} as const
}

type ActionsType = ReturnType<typeof addGiftAC>

export type ContributorType = {
    id: number
    eventId: number
    userId: number
    isAccepted: boolean
}