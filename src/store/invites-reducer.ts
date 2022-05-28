const initialState: InvitesItemType[] = []

export const invitesReducer = (state: InvitesItemType[] = initialState, action: ActionsType): InvitesItemType[] => {
    switch (action.type) {
        case 'SET-INVITES':
            return action.invite.map(i => {
                return {...i}
            })
        default:
            return state
    }
}

export const setInvitesAC = (invite: InvitesItemType[]) => {
    return {type: 'SET-INVITES', invite} as const
}

type ActionsType = ReturnType<typeof setInvitesAC>

export type InvitesItemType = {
    id: number
    title: string
    date: Date
    location: string
}
