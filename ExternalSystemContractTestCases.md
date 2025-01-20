# Feature: Get Operating System Theme     

## Scenario 1: The OS theme is Light      
**Given** the app theme is set as `id: systemTheme`    
**And** the OS theme is set to {"theme": "Light"}     
**When** send a GET request to "/theme"     
**Then** the response status code should be 200
**And** the response should return the theme as light theme


## Scenario 2: The OS theme is Dark   
**Given**  the app theme is set as `id: systemTheme`     
**And** the OS theme is set to {"theme": "Dark"}       
**When** send a GET request to "/theme"     
**Then** the response status code should be 200
**And** the response should return the theme as dark theme


## Scenario 3: Change the OS theme 
**Given** the app theme is set as `id: systemTheme`     
**And** the OS theme is set to {"theme": "Dark"}
**When** send a POST request to {"theme": "Light"}    
**Then** the response status code should be 200  
**And** the response should return the theme as dark theme


# Feature: Not to Get Operating System Theme

## Scenario 1: The app theme is `Dark`       
**Given** the app theme is set as `id: darkTheme`        
**And** the OS theme is set {"theme": "Light"}     
**When** the user launches the app     
**Then** the user should see the app theme as Dark


## Scenario 2: The app theme is Light
**Given** the app theme is set as `id: lightTheme`    
**And** the OS theme is set {"theme": "Dark"}       
**When** the user launches the app         
**Then** the user should see the app theme as Light       


# Feature:  GitHub Releases API for Update Checks

## Scenario: Current version up to date
**Given** the application has a `package.json` file with the version "1.0.0."
**And**  the latest available version is "1.0.0"
**When** make a GET request to the endpoint "/repos/vaisakhsasikumar/my-electron-app/releases/latest"           
**Then**  the response status code should be 200
**And** the app should notify the user with "Your current version is up to date."
**And** the returned version should be "1.0.0"



## Scenario: Latest version available
**Given** the application has a `package.json` file with the version "1.0.0."
**And**   And the latest available version is "1.1.0"
**When** make a GET request to the endpoint "/repos/vaisakhsasikumar/my-electron-app/releases/latest"           
**Then**  the response status code should be 200
**And** the app should notify the user with  "Latest version is available"
**And** the returned version should be "1.1.0"
