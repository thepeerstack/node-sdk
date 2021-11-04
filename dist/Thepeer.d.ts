/// <reference types="node" />
import { IndexedUser, DeleteResponse, User, Link, Transaction } from './types';
export declare class Thepeer {
    private secretKey;
    private request;
    constructor(secretKey: string);
    validateSignature(payload: Buffer, signature: string): boolean;
    private dispatchRequest;
    indexUser(name: string, identifier: string, email: string): Promise<{
        indexed_user: IndexedUser;
    } | undefined>;
    updateUser(reference: string, identifier: string): Promise<{
        indexed_user: IndexedUser;
    } | undefined>;
    deleteUser(reference: string): Promise<DeleteResponse | undefined>;
    getUser(reference: string): Promise<{
        user: User;
    } | undefined>;
    getLink(linkId: string): Promise<{
        link: Link;
    } | undefined>;
    chargeLink(linkId: string, amount: number, remark: string): Promise<{
        transaction: Transaction;
    } | undefined>;
    authorizeDirectCharge(reference: string, insufficientFunds: boolean): Promise<{
        transaction: Transaction;
    } | undefined>;
    processSendReceipt(receipt: string, insufficientFunds: boolean): Promise<{
        transaction: Required<Transaction>;
    } | undefined>;
    getSendReceipt(receipt: string): Promise<{
        transaction: Required<Transaction>;
    } | undefined>;
}
