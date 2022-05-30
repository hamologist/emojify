export interface RequestPayload {
    message: string,
}

export const isRequestPayload = (obj: any): obj is RequestPayload => {
    if (!obj.message) {
        return false;
    }

    return true;
}
