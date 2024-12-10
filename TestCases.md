# Feature: Running MongoDB `find()` Query

## Scenario 1: User successfully runs a `find` query
**Given** the user is added to the document as in the example below by using Studio 3T  
**When** the user writes `{ "name": "John Doe" }` in the **Enter MongoDB Query** field  
**And** clicks the **Run Query** button    
**Then** the user should see a **Query Result**   

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

## Scenario 2: User runs an unsuccessfully `find` query  
**Given** the user is added to the document as in the example above by using Studio 3T   
**When** the user writes `{ name: "John Doe" }` in the **Enter MongoDB Query** field  
**But** it has a missing **"** in the query  
**And** clicks the **Run Query** button   
**Then** the user sees an error message:  `{"error": "Invalid query or server error."}`  



# Feature: Viewing Results in JSON Format

## Scenario: User successfully runs a `find` query and sees a Query Result in JSON format
**Given** the user runs `{ "name": "John Doe" }`  
**When** the user clicks the **Run Query** button  
**Then** the user should see the **Query Result** in JSON format  



# Feature: Change the Advanced View

## Scenario 1: User successfully can toggle Advanced view: on  
**Given** the user opens the Electron tool    
**And** sees the **Advanced view toggle** by default off    
**When** the user toggles the **Advanced view** on   
**Then** the user should see the Advance view is **on**   
**And** the user should see **Query History**   

## Scenario 2: User successfully can toggle Advanced view: off    
**Given** the user sees the advanced view: on    
**When** the user toggles the Advanced view from on to off   
**Then** the user should see the Advanced view is **off**    
**And** the user shouldn't see **Query History**    



# Feature: Seeing Persisting Query History

 ## Scenario 1: User sees no saved queries under Query History
 **Given**  the user opens the Electron tool for the first time   
 **When** the user toggles the Advanced view: on  
 **But** the user doesn’t click the Run Query button   
 **Then** the user should see no history in the Query History   

 ## Scenario 2: User successfully sees saved queries under Query History
 **Given** the user has already opened the tool   
 **And** the user has already toggled the Advanced view: on  
 **When** the user runs a query  
 **Then** the user should see the query in the Query History under the Query Result   

 ## Scenario 3: User successfully uses their previous saved query and the result
 **Given** the user has already toggled the Advanced view: on  
 **And** the user has already run a few queries  
 **When** the user clicks one of the queries in the history 
 **Then** the user should see the query filled in the Enter MongoDB Query field 

 ## Scenario 4: User sees their previous saved queries when changing the Advanced view from off to on
 **Given** the user has already toggled the Advanced view: on  
 **And** the user has already had a few saved queries under the Query History  
 **And** the user sees all the previous saved queries   
 **When** the user clicks the Advanced view: off   
 **And** the user clicks the Advanced view: on again   
 **Then** the user should see all the Query History under the Query Result again   

 ## Scenario 5: User sees the Query History after restarting the Electon tool
 **Given** the user has already toggled the Advanced view: on   
 **And** the user clicks one of the queries in the history  
 **When** the user closes the Electron tool   
 **And** the user launches the Electron tool again   
 **And**  the user toggles the Advanced view from off to on   
 **Then** the user should see the previous saved queries under the Query History   

 ## Scenario 6: The Query History continues to save queries when the Advanced view: off
 **Given** the user has toggled the Advanced view: off   
 **When** the user runs a query   
 **And** the user toggled the Advanced view: on again   
 **Then** the user should see the last run query in the Query History  


    
# Feature: Settings

## Scenario 1: User successfully can see the Settings menu
**Given** the user opens the Electron tool   
**And** sees Electron’s name at the top left corner  
**When** the user clicks on Electron   
**Then**  the user should see About-my-electron-app, Settings and Quit-my-electron-app options  
    
## Scenario 2: User successfully can open the Settings menu
**Given** the user opens the Electron tool  
**And** sees Electron’s name at the top left corner  
**When** the user clicks on Electron   
**And** the user clicks on the Settings option  
**Then**  the user should see the Settings dialog  

## Scenario 3: User can see the Settings menu options
**Given** the user opens the Settings menu  
**When** the user should see Select Theme with the Light, Dark and As in System options   
**And** the user should see Database settings with URI, Database Name and Collection Name fields  
**And** the user should see the Cancel and Apply buttons  

 ## Scenario 4: User can see the default options in the Settings menu
 **Given** the user opens the Settings menu  
 **Then** As in system theme should be selected   
 **And** the default URI should be mongodb://localhost:27017  
 **And** the default Database Name should be test  
 **And** the default Collection Name should be test   



# Feature: Select Theme

## Scenario 1: User can see the default Theme 
**Given** the user opens the Electron tool  
**And** sees Electron’s name at the top left corner  
**And** the user clicks on Electron  
**And** the user clicks on the Settings option  
**Then** the user should see the theme is selected by default as As in System  
    
 ## Scenario 2: Clicking the Cancel button
 **Given** the user opens the Settings menu  
 **When** the user selects Dark theme  
 **And** the user clicks the Cancel button   
 **Then** the theme should not change to Dark theme  
 **And** the theme should continue to show the latest chosen theme  

## Scenario 3: Clicking the Apply button
**Given** the user opens the Settings menu   
**When** the user selects Dark theme   
**And** the user clicks the Apply button   
**Then** the theme should change to Dark theme   
