# Feature: Running MongoDB `find()` Query

## Scenario 1: User successfully runs a `find` query
**Given** the user is added to the document as in the example below by using Studio 3T  
**When** the user writes `{ "name": "John Doe" }` in the **Enter MongoDB Query** field  
**And** clicks the **Run Query** button  
**Then** the user sees a **Query Result**  

### Examples:
- **Database**: `test`  
- **Collection**: `test`  
- **Document**:
  ```json
  {
      "_id": 11111,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": 30,
      "address": {
          "street": "123 Main St",
          "city": "Metropolis",
          "state": "NY",
          "zip": "12345"
      },
      "hobbies": [
          "reading",
          "traveling",
          "gaming"
      ]
  }

## Scenario 2: User unsuccessfully runs a `find` query

**Given** the user is added to the document as in the example above by using Studio 3T  
**When** the user writes `{ name: "John Doe" }` in the **Enter MongoDB Query** field  
**And** clicks the **Run Query** button  
**Then** the user sees an error message:  
`{"error": "Invalid query or server error."}`  



# Feature: Viewing Results in JSON Format

## Scenario: User successfully runs a `find` query and sees a Query Result in JSON format

**Given** the user runs `{ "name": "John Doe" }`  
**When** the user clicks the **Run Query** button  
**Then** the user should see the **Query Result** in JSON format  



# Feature: Change the Advanced View

## Scenario: User successfully toggles Advanced view

**Given** the user opens the Electron tool  
**And** sees the **Advanced view toggle** by default off  
**When** the user toggles the **Advanced view**  
**Then** the toggle is shown active with a green color  
**And** the user sees all the Query Histories under the **Query Result**  



# Feature: Seeing Persisting Query History

## Scenario 1: User successfully sees their previous queries saved in local storage

**Given** the user runs a few queries  
**When** the user toggles the **Advanced view**: on  
**Then** the user sees all the Query Histories under the **Query Result**  

## Scenario 2: User successfully uses their previous saved query and sees the result

**Given** the user toggles the **Advanced view**: on  
**When** the user clicks one of the queries in the history  
**Then** the user sees the query in the **Enter MongoDB Query** field  
**And** the user sees the results that were already run  




