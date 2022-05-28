const initialState: EventType[] = []

export const eventsReducer = (state: EventType[] = initialState, action: ActionsType): EventType[] => {
    switch (action.type) {
        case 'SET-EVENTS':
            return action.events.map(e => {
                return {...e}
            })
        case 'CHANGE-EVENT-TITLE':
            return state.map(e => e.id === action.eventId ? {...e, title: action.title} : e)
        case 'DELETE-EVENT':
            return state.filter(e => e.id !== action.eventId)
        case 'CHANGE-EVENT-DATE':
            return state.map(e => e.id === action.eventId ? {...e, date: action.date} : e)
        default:
            return state
    }
}

export const setEventsAC = (events: EventType[]) => {
    return {type: 'SET-EVENTS', events} as const
}
export const changeEventTitleAC = (eventId: number, title: string) => {
    return {type: 'CHANGE-EVENT-TITLE', eventId, title} as const
}
export const deleteEventAC = (eventId: number) => {
    return {type: 'DELETE-EVENT', eventId} as const
}
export const changeEventDateAC = (eventId: number, date: Date | string) => {
    return {type: 'CHANGE-EVENT-DATE', eventId, date} as const
}

type ActionsType =
    | ReturnType<typeof changeEventTitleAC>
    | ReturnType<typeof deleteEventAC>
    | ReturnType<typeof setEventsAC>
    | ReturnType<typeof changeEventDateAC>

export type EventType = {
    id: number
    ownerId: number
    title: string
    date: Date | string
}
