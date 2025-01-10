# Feature: Launch my-electron-app
## Scenario: User successfully launches the app
**Given** the user is double-clicked to the latest app's build    
**And** drags and drops the app to the Applications folder    
**When** the user clicks and launches the app      
**Then** the user should see the app is opened successfully


# Feature: Check my-electron-app title
## Scenario: User successfully sees the expected title in the app
**Given** the user launches the Electron tool     
**When** the app opens successfully       
**Then** the user should see the `MongoDB Query Executor` title in the app     


# Feature: Check the Enter MongoDB Query field is writable 
## Scenario: User successfully writes the query in the app
**Given** the user launches the Electron tool    
**And** the app opens successfully    
**When** the user writes a value into the `Enter MongoDB Query`field    
**Then** the user should write a query in the app successfully


# Feature: Check the Run Query button is clickable 
## Scenario: User successfully clicks the Run Query button
**Given** the user launches the Electron tool    
**And** the app opens successfully    
**When** the user clicks `Run Query`button   
**Then** the user should see a Query Result in the app


# Feature: Close my-electron-app
## Scenario: User successfully closes the app
**Given** the user has already opened the app     
**When** the user clicks the cross button at the top corner of the left side      
**Then** the user should see the app is closed successfully     
