const initialState: EventType[] = [
    {id: 1, ownerId: 11, title: 'Новый год', date: new Date()},
    {id: 2, ownerId: 11, title: 'Концерт пульса', date: new Date()},
    {id: 3, ownerId: 11, title: 'ДР кавейры', date: new Date()},
]

export const eventsReducer = (state: EventType[] = initialState, action: ActionsType): EventType[] => {
    switch (action.type) {
        case 'ADD-EVENT':
            return [...state, {
                id: 4,
                ownerId: 14,
                title: action.title,
                date: action.date,
            }]
        case 'CHANGE-EVENT-TITLE':
            return state.map(e => e.id === action.eventId ? {...e, title: action.title} : e)
        case 'DELETE-EVENT':
            return state.filter(e => e.id !== action.eventId)
        default:
            return state
    }
}

export const addEventAC = (title: string, date: any) => {
    return {type: 'ADD-EVENT', title, date} as const
}
export const changeEventTitleAC = (eventId: number, title: string) => {
    return {type: 'CHANGE-EVENT-TITLE', eventId, title} as const
}
export const deleteEventAC = (eventId: number) => {
    return {type: 'DELETE-EVENT', eventId} as const
}

type ActionsType =
    ReturnType<typeof addEventAC>
    | ReturnType<typeof changeEventTitleAC>
    | ReturnType<typeof deleteEventAC>

export type EventType = {
    id: number
    ownerId: number
    title: string
    date: Date
}