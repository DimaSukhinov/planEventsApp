import axios from 'axios'
import {userKeyStorage} from './Storage'

export const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        Authorization: `Bearer ${userKeyStorage.getItem('key')}`
    },
})

const authHeaders = () => {
    return {
        headers: {
            Authorization: `Bearer ${userKeyStorage.getItem('key')}`
        }
    }
}

export const authAPI = {
    register(data: registerPostType) {
        return instance.post<registerPostType>(`user/registration`, data)
    },
    login(data: loginPostType) {
        return instance.post<loginPostType, { data: { token: string } }>(`user/login`, data)
    },
}

export const eventsAPI = {
    allEvents() {
        return instance.get<{ user_events: [] }>(`user/events/all`, authHeaders())
    },
    getEvent(id: number) {
        return instance.get<eventType>(`user/events/${id}`, authHeaders())
    },
    createEvent(title: string, date: string, location: string) {
        return instance.post<createEventPostType>(`user/events`, {title, date, location}, authHeaders())
    },
    deleteEvent(id: number) {
        return instance.delete(`user/events/${id}`, authHeaders())
    },
    changeEvent(id: number, data: changeEventType) {
        return instance.patch(`user/events/${id}`, data, authHeaders())
    },
    inviteUser(userName: string, eventId: number) {
        return instance.post(`user/invite`, {userName, eventId}, authHeaders())
    }
}

export const giftsAPI = {
    createGift(eventId: number, title: string, quantity: number, status: boolean) {
        return instance.post(`user/gift`, {eventId, title, quantity, status}, authHeaders())
    },
    deleteGift(giftId: number, eventId: number) {
        return instance.delete(`user/gift`, {data: {giftId, eventId}, ...authHeaders()})
    },
    giftCheck(giftId: number, eventId: number) {
        return instance.patch(`user/gift/check`, {giftId, eventId}, authHeaders())
    },
}

export const itemsAPI = {
    createItem(eventId: number, title: string, quantity: number, status: boolean) {
        return instance.post(`user/item`, {eventId, title, quantity, status}, authHeaders())
    },
    deleteItem(itemId: number, eventId: number) {
        return instance.delete(`user/item`, {data: {itemId, eventId}, ...authHeaders()})
    },
    itemCheck(itemId: number, eventId: number) {
        return instance.patch(`user/item/check`, {itemId, eventId}, authHeaders())
    },
}

export const invitationsAPI = {
    getInvitations() {
        return instance.get<GetInvitationsType[]>(`user/invitations`, authHeaders())
    },
    postInvitations(eventId: number, type: 'accept' | 'reject') {
        return instance.post(`user/invitations`, {eventId, type}, authHeaders())
    },
    getAcceptedInvitations() {
        return instance.get<GetInvitationsType[]>(`user/invitations/accepted`, authHeaders())
    },
}

// types
type registerPostType = {
    login: string
    userName: string
    password: string
}

type loginPostType = {
    login: string
    password: string
}

type eventType = {
    event: {
        id: number,
        ownerId: number,
        title: string,
        date: string
    },
    gifts: [
        {
            id: number,
            eventId: number,
            title: string,
            status: boolean,
            quantity: number,
        }
    ],
    location: [
        {
            id: number,
            eventId: number,
            title: string
        }
    ],
    pItems: [
        {
            id: number,
            eventId: number,
            title: string,
            status: boolean,
            quantity: number,
        }
    ]
    users: [
        {
            id: number,
            userName: string,
            isAccepted: boolean | null
        }
    ]
}

type createEventPostType = {
    title: string
    date: string | Date
    location: string
}

type changeEventType = {
    type: 'title' | 'date' | 'location'
    value: string | Date
}

type GetInvitationsType = {
    id: number
    title: string
    date: Date
    location: string
    username: string
}
