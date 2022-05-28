const initialState: AcceptedInvitesItemType[] = []

export const acceptedInvitesReducer = (state: AcceptedInvitesItemType[] = initialState, action: ActionsType): AcceptedInvitesItemType[] => {
    switch (action.type) {
        case 'SET-ACCEPTED-INVITES':
            return action.acceptedInvite.map(i => {
                return {...i}
            })
        default:
            return state
    }
}

export const setAcceptedInvitesAC = (acceptedInvite: AcceptedInvitesItemType[]) => {
    return {type: 'SET-ACCEPTED-INVITES', acceptedInvite} as const
}

type ActionsType = ReturnType<typeof setAcceptedInvitesAC>

export type AcceptedInvitesItemType = {
    id: number
    title: string
    date: Date
    location: string
    username: string
}
