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

declare class Thepeer {
  private secretKey;
  private request;
  constructor(secretKey: string);
  validateSignature(payload: Buffer, signature: string): boolean;
  private dispatchRequest;
  indexUser(name: string, identifier: string, email: string): Promise<IndexedUser | undefined>;
  updateUser(reference: string, identifier: string): Promise<IndexedUser | undefined>;
  deleteUser(reference: string): Promise<DeleteResponse | undefined>;
  getUser(reference: string): Promise<User | undefined>;
  getLink(linkId: string): Promise<Link | undefined>;
  chargeLink(linkId: string, amount: number, remark: string): Promise<Transaction | undefined>;
  authorizeDirectCharge(reference: string, insufficientFunds: boolean): Promise<Transaction | undefined>;
  processSendReceipt(receipt: string, insufficientFunds: boolean): Promise<Required<Transaction> | undefined>;
  getSendReceipt(receipt: string): Promise<Required<Transaction> | undefined>;
}
export default Thepeer;