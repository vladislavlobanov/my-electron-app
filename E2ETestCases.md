# Feature: Running find query with Advanced view   

## Scenario: User runs a find query in the Advanced view successfully
**Given** the user launches the Electron app       
**And** toggles the Advanced view: on      
**When** the user writes {"age": 30} as the MongoDB Query      
**And** the user clicks the Run Query button     
**Then** the user should see the result in the Query Result       
**And** the user should see the ran query at the of the list of Query History        
