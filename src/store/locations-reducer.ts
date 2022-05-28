const initialState: LocationsType = {
    id: 0,
    eventId: 0,
    title: ''
}

export const locationsReducer = (state: LocationsType = initialState, action: ActionsType): LocationsType => {
    switch (action.type) {
        case 'SET-LOCATIONS':
            return action.location
        case 'CHANGE-LOCATION-TITLE':
            return {...state, title: action.title}
        default:
            return state
    }
}

export const setLocationsAC = (location: LocationsType) => {
    return {type: 'SET-LOCATIONS', location} as const
}
export const changeLocationTitleAC = (eventId: number, title: string) => {
    return {type: 'CHANGE-LOCATION-TITLE', eventId, title} as const
}

type ActionsType = ReturnType<typeof setLocationsAC> | ReturnType<typeof changeLocationTitleAC>

export type LocationsType = {
    id: number
    eventId: number
    title: string
}
