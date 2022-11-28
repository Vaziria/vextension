

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


export interface ExtensionInfoEvent {
    event_name: 'extension_info'
    data: {
        extensionId: string
    }
}


export interface AckExtensionInfoEvent {
    event_name: 'ack_extension_info'
    data: {
        extensionId: string
    }
}

export type AllEvent = TokenEvent | SessionEvent | ExtensionInfoEvent | AckExtensionInfoEvent



