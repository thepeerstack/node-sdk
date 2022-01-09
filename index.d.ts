import { BinaryLike } from 'crypto';
import { AxiosInstance } from "axios";

export type Event = 'success' | 'insufficient_funds' | 'business_decline' | 'user_decline';

export type Status = 'success' | 'failed' | 'pending';

export interface DeleteResponse {
  message: 'user deleted';
}

export interface IndexedUser {
  name: string;
  email: string;
  identifier: string;
  reference: string;
  /**
   * The primary means of user identification on your platform. There are various type of identifier types which ranges from 
   * `email`, `username`, `phone number`, `Account ID` etc. However, we currently support `username` and `email`.
   */
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

/**
 * 	The Peer object contains objects of the user and business the transaction is being carried out with
 */
export interface Peer {
  user: User;
  business: Business;
}

/**
 * A connection between your user's account on your platform to another user's account on another platform on Thepeer. 
 * With links, your users can perform a Direct charge via our APIs or available SDKs.
 */
export interface Link {
  id: string;
  user: User;
  peer: Peer;
  created_at: string;
  updated_at: string;
}

/**
 * The transaction object contains all the information about a transaction. it is usually returend after calling
 * an authorizing endpoint (`process receipt` and `authorize direct charge`) and also usually received via webhook.
 */
export interface Transaction extends Link {
  type: string;
  remark: string;
  refund: boolean;
  channel: string;
  amount: number;
  status: Status;
  reference: string;
  mode: 'credit' | 'debit';
  /**
   * This object should contain additional/optional values passed from the SDK
   */
  meta?: {
    city: string;
    state: string;
  };
}

declare class Thepeer {

  public secretKey: string;
  private request: AxiosInstance;

  /**
   * creates Thepeer Instance
   * @param secretKey - Thepeer secret key
   */
  constructor(secretKey: string);

  /**
   * 
   * @param payload - The payload to be verified.
   * @param signature -  The signature to compare with
   * @returns a boolean indicating if the signature is valid
   */
  validateSignature(payload: BinaryLike, signature: string): boolean;

  /**
   * This function index your users In order to make your `users` resolvable on the SDK, you need to index them on Thepeer. 
   * Your `identifier` must match the identifier type registered on your business, at the time of writing 
   * this we currently support `username` and `email`.
   * @param name - The name of the user
   * @param identifier - The identifier of the user
   * @param email - The email of the user
   */
  indexUser(name: string, identifier: string, email: string): Promise<IndexedUser | undefined>;

  /**
   * This function allows you update your user's identifier when they make a profile update to their identifier on your platform.
   * @param reference - The `reference` returned when the user was indexed
   * @param identifier - The identifier of the user
   */
  updateUser(reference: string, identifier: string): Promise<IndexedUser | undefined>;

  /**
   * This function allows you delete a user in the event that a user deactivates their account on your platform.
   * @param reference - The `reference` returned when the user was indexed
   */
  deleteUser(reference: string): Promise<DeleteResponse | undefined>;

  /**
   * 
   * @param reference - The `reference` returned when the user was indexed
   */
  getUser(reference: string): Promise<User | undefined>;

  /**
   * This function returns a linked account details by passing its `ID`.
   * @param linkId - The id of a user linked account
   */
  getLink(linkId: string): Promise<Link | undefined>;

  /**
   * This function allows you to charge your user's linked account at any time, as long as the other business in 
   * which the direct charge is being caried on approves the direct charge request via its webhook.
   * @param linkId - The id of the link
   * @param amount - amount in kobo
   * @param remark - The reason for initiating a direct charge
   */
  chargeLink(linkId: string, amount: number, remark: string): Promise<Transaction | undefined>;

  /**
   * This function authorize direct charge request via webhooks, for every time a direct charge request is made via our APIs or via our SDK;
   * We send a webhook with in a format like this. You are expected to extract the reference so you can use it to authorize the direct charge 
   * request.
   * @param reference - The direct charge `reference` sent via webhook
   * @param event - Event type `success`, `insufficient_funds`
   */
  authorizeDirectCharge(reference: string, event: Event): Promise<Transaction | undefined>;

  /**
   * This function is used to process receipts generated from Thepeer inline (chain.js). 
   * Once this function is successfully called we debit both parties involved and send a webhook to the 
   * receiving party notifying them of the transaction.
   * @param receipt - The `reference` returned to your receiptURL via the Chain SDK
   * @param event -  Event type `success`, `insufficient_funds`
   */
  processSendReceipt(receipt: string, event: Event): Promise<Required<Transaction> | undefined>;

  /**
   * 
   * @param receipt - The `reference` returned to your receiptURL via the Chain SDK
   */
  getSendReceipt(receipt: string): Promise<Required<Transaction> | undefined>;
}

export default Thepeer;