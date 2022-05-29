import img from '../assets/img.png'
import img1 from '../assets/club.png'
import img2 from '../assets/house.png'
import img3 from '../assets/club2.png'
import img4 from '../assets/newYear.png'
import img5 from '../assets/house2.png'
import img6 from '../assets/nature.png'
import img7 from '../assets/nature2.png'

const initialState: EventType[] = []

const images = [img, img1, img2, img3, img4, img5, img6, img7, img, img1, img2, img3, img4, img5, img6, img7, img, img1, img2, img3, img4, img5, img6, img7]

export const eventsReducer = (state: EventType[] = initialState, action: ActionsType): EventType[] => {
    switch (action.type) {
        case 'SET-EVENTS':
            return action.events.map(e => {
                return {...e, img: images[e.id]}
            })
        case 'CHANGE-EVENT-TITLE':
            return state.map(e => e.id === action.eventId ? {...e, title: action.title} : e)
        case 'DELETE-EVENT':
            return state.filter(e => e.id !== action.eventId)
        case 'CHANGE-EVENT-DATE':
            return state.map(e => e.id === action.eventId ? {...e, date: action.date, isDateChange: true} : e)
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
    img: any
    isDateChange: boolean
}
