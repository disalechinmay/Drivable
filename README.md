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
  
  
MAJOR IMPLEMENTATION ISSUES :
----------------------------

DATA OVERLAP : 
-------------
Consider the data for route from Mumbai to Pune (approx 150km) is already added to the map.
Say you recently travelled on this route and noticed a section to be bad and full of potholes.
Seeing this, you wish to modify the information on that particular section, so that other people can take alternative route.
However, considering the current database setup, the data will get overwritten.
The map will show the modified route condition correctly, regardless.
This will not work as the road conditions change all the time and the data needs to be updated all the time.
This will result in a lot of unutilized data and database will grow larger unnecesarily.

SOLUTIONS TO DATA OVERLAP :
--------------------------
We want to get rid of old overlapped data. The biggest issue here is how will you find the data overlap?
Searching a record against every other record for overlaps is definitely not the way to go.

A solution to this problem would be fragmentation of land area. 
Consider India. The mainland stretches from 8 degrees North to about 35 degrees North; 68 degrees East to about 96 degrees East.
We could partition the entire land area into equally sized units. 
Eg. unit 1 would be from 8 degrees to 9 degrees North & 68 degrees East to 69 degrees East. 

Now that we have fragmented the land area, a good solution would be to make seperated collections on our database for each seperate unit. 
The collection names will be hashed according to a custom hash function which will make decisions according to the coordinates of that particular unit.
Here we have already overcome the a major problem as we wouldnt be required to search the entire database.

However, the problem still persists. If the entire section of road lies within a single unit, it's well and good.
But, if it migrates to other units, we would be required to make modifications to their respective collections as well.
(Finding the collection corresponding to unit where road has migrated into is a very easy task because of hashed collection names.)
Again, the entire collection will need to be searched for in order to find the overlap.
We could obviously go on to compare raw LatLng data, but that would be a time consuming operation.
What we can do is, add an aditional data regarding all the places through which the road passes through inside the document.
Obviously, searching using names of places would be way faster than going through all coordinates.

Overall, the solution can be summarised as :
1. Divide the land area into numerous equally sized units. 
2. Create separate collections for all these units.
3. Make a hash function which will generate names of these collections. This will be useful in locating a target unit.
4. Modify the document to include the names of places through which road actually passes.

Expected outcome of the solution : Minimization of the search.




 
