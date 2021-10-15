# Thepeer node

## Installation

```bash
npm i thepeer-node
```

## Usage

```js
const thepeer = new Thepeer(secretKey)

let user = thepeer.indexUser("Thor Odin", "thor", "thor@odin.com");
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
        - insufficient_funds (bool)
    - `returns`: object
    
* indexUser
    - `accepts`:
        - name (string)
        - email (string)
        - identifier (string)
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
        - insufficient_funds (bool)
    - `returns`: object

## Extra

Refer to the [documentation](https://docs.thepeer.co) for more information.
