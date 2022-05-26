const initialState: PurchaseItemType[] = [
    {id: 11111111, eventId: 1, title: 'Ручка', status: false, quantity: 2000},
    {id: 1111112, eventId: 1, title: 'Стул', status: true, quantity: 300},
]

export const purchaseItemsReducer = (state: PurchaseItemType[] = initialState, action: ActionsType): PurchaseItemType[] => {
    switch (action.type) {
        case 'ADD-ITEM':
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

export const addItemAC = (title: string, quantity: number | null) => {
    return {type: 'ADD-ITEM', title, quantity} as const
}

type ActionsType = ReturnType<typeof addItemAC>

export type PurchaseItemType = {
    id: number
    eventId: number
    title: string
    status: boolean
    quantity: number | null
}
