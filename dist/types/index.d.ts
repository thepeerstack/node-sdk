export declare type Status = 'success' | 'failed' | 'pending';
export interface RequestConfig {
    requestType?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    endpoint: string;
    payload?: object;
}
export interface DeleteResponse {
    message: 'user deleted';
}
export interface IndexedUser {
    name: string;
    email: string;
    identifier: string;
    reference: string;
    identifier_type: string;
}
export interface User extends IndexedUser {
    created_at: string;
    updated_at: string;
}
export interface Business extends Pick<User, 'name' | 'identifier_type'> {
    id: string;
    logo: string;
    logo_colour: string;
}
export interface Peer {
    user: User;
    business: Business;
}
export interface Link {
    id: string;
    user: User;
    peer: Peer;
    created_at: string;
    updated_at: string;
}
export interface Transaction extends Link {
    type: string;
    mode: string;
    remark: string;
    amount: number;
    status: Status;
    reference: string;
    meta?: {
        city: string;
        state: string;
    };
}
