/*
NOTES ON IMPROVEMENTS

-   Want to find a way of making the Behaviour script use the "role" attribute 
    of the Units module
    
-   Governor function is currently catching an error on the harvester behaviour
    I would like to get the try working, meaning that I would like to get units
    behaviour comming from the particular unit's attributes found in the 
    "Units" module
    
-   Want to find a way of having multiple variables within a module with
    different functions as attributes

NOTES ON DISCOVERIES

-   It does not seem that you can have 2 variables in a module and call on an
    attribute as a function, however, you may have multiple functions as 
    attributes of the same variable

-   Part costs:
        MOVE            -   50      1 move part counteracts the weight of 1 other part
        WORK            -   100
        CARRY           -   50      carry parts only count for weight when full
        ATTACK          -   80
        RANGED_ATTACK   -   150
        HEAL            -   250
        TOUGH           -   10
        CLAIM           -   600
