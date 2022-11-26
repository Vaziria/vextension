

export interface Cookie {
    [key: string]: string
}

export interface TokenEvent {
    event_name: 'token_event'
    data: {
        afAcEncDat: string
        szToken: string
    }
    
}

export interface SessionEvent extends Omit<TokenEvent, 'event_name'> {
    event_name: 'session_event'
    data: {
        cookies: Cookie
    } & TokenEvent['data']
}

export type AllEvent = TokenEvent | SessionEvent 



