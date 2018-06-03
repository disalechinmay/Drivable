# Drivable

  Drivable is a web application based on Google Maps which allows users to select a section of road and associate it with a road condition. This association will be established using various color combinations and will be saved permanently using MongoDB. This application is intended to be used by drivers so that they could manipulate their directions according to current road conditions.
  
  Tools used : HTML/CSS, JavaScript (NodeJS, Express), MongoDB
  
MongoDB specifications :
    Database name : "DrivableDB"
    Collection name : "routes"
    
    Collection's document format : (JSON)
    {
      "_id" : "SET BY MONGODB",
      "coordinates" : 
                      [
                        {"lat" : 17.5317, "lng" : 73.52},
                        {"lat" : 18.5317, "lng" : 74.52}
                      ],
      "roadConditionColor" : "red"
    }
    
LOADING USER DRAWN ROADS ON PORT : "8000"

SAVING USER DRAWN ROADS ON PORT : "8001"
    
HELP
----
Starting MongoDB : 

  MAKE SURE MONGODB IS INSTALLED ON YOUR MACHINE!
      
  Navigate to installation directory's bin folder.
  
  Start mongod.exe using following command : 
  
      "mongod.exe --dbpath [PATH]"
      
          --dbpath specifies [PATH] to the project's data store. Simply create a new folder inside your project's directory and specify it's path here. MongoDB will take care of the rest.
              
   IF ANY APPENGINE RELATED ERROR OCCURS SET ENGINE TO "vvmap1". GOOGLE FOR DIRECTIONS.
       
       
       
  MAKE SURE YOU HAVE INSTALLED NODEJS ALONG WITH ALL THE REQUIRED PACKAGES. CHECK WEBSTORM CONSOLE FOR DETAILS.
  
  MAKE SURE TO START BOTH LOADER AND SAVER FILES USING FOLLOWING COMMAND : 
  
      "node loadUserDrawnMaps.js",
      
      "node saveUserDrawnMaps.js"
          
          
  !!!VERY IMPORTANT!!!
  
  API KEY HAS NOT BEEN ADDED!
