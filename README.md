# Thepeer node

## Installation

```bash
npm i thepeer-node
```

## Usage

```js
const userPayload = {
    name: 'Ila Rowe',
    identifier: 'garnet.keeling@hotmail.com',
    email: 'garnet.keeling@hotmail.com',
}

let user = thepeer.indexUser({ ...userPayload });
```

### Available methods

* validateSignature
    - `accepts`: 
        - request (object)
        - signature (object)
    - `returns`: boolean
    
* getSendReceipt
    - `accepts`: 
        - receipt_id (string)
    - `returns`: object
    
* processSendReceipt
    - `accepts`: 
        - receipt_id (string)
        - event (string)
    - `returns`: object
    
* indexUser
    - `accepts`:
        - payload (object)
        - payload.name (string)
        - payload.identifier (string)
        - payload.email (string)
    - `returns`: object
        
* updateUser
    - `accepts`:
        - reference (string)
        - identifier (string)
    - `returns`: object
        
* deleteUser
    - `accepts`:
        - reference (string)
    - `returns`: boolean
    
* getLink
    - `accepts`:
        - lind_id (string)
    - `returns`: object

* chargeLink
    - `accepts`:
        - lind_id (string)
        - amount (integer)
    - `returns`: object
    
* authorizeDirectCharge
    - `accepts`:
        - reference (string)
        - event (string)
    - `returns`: object

## Extra

Refer to the [documentation](https://docs.thepeer.co) for more information.
