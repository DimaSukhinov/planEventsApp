const initialState: PurchaseItemType[] = []

export const purchaseItemsReducer = (state: PurchaseItemType[] = initialState, action: ActionsType): PurchaseItemType[] => {
    switch (action.type) {
        case 'SET-ITEMS':
            return action.item.map(i => {
                return {...i}
            })
        case 'CHANGE-ITEM-STATUS':
            return state.map(i => i.id === action.eventId ? {...i, status: action.status} : i)
        default:
            return state
    }
}

export const setItemsAC = (item: PurchaseItemType[]) => {
    return {type: 'SET-ITEMS', item} as const
}
export const changeItemStatusAC = (status: boolean, eventId: number) => {
    return {type: 'CHANGE-ITEM-STATUS', status, eventId} as const
}

type ActionsType = ReturnType<typeof setItemsAC> | ReturnType<typeof changeItemStatusAC>

export type PurchaseItemType = {
    id: number
    eventId: number
    title: string
    status: boolean
    quantity: number
}
