/*
    Get a variable out of a file
    1. Add type="module" attribute
    2. Export
    3. import
    To avoid name conflict and can use fewer <script src=''>
    in html file. 
    Don't have to worry abour the order of files.
    In order for the module to work, 
    need to use live server.
*/

export const cart = []; // this variable can be used ouside of cart.js