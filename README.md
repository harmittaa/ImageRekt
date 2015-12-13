# ImageRekt
ImageRekt image upload service

Made for the Basic Concepts of Web Technology course by
Juhani Lavonen
Matti Mäki-Kihniä
Mikael Gousetis

ImageRekt is a web based image sharing service. It was developed for the smartphone users, with mobile first design.
Users can upload, view, comment, rate, share, favourite and search for pictures.
Registration is only required for users who wish to comment or rate.

For registered users the service offers the ability to view their uploaded and favourited images.

Functionality:
Link to Log In from the Sign Up screen
Link to Sign up from the Log in screen

Log in, Sign up, search, upload screen are Bootstrap modals

Upload screen shows small preview of the picture user chose to upload.
Upload screen Title and Description box are automatically limited to specified character lenghts.
Empty title and description fields are not allowed.
After uploading the image is automatically opened - BROKEN :(((((((((((((((((((((((.

Search by title, user, description.
Title and description use wildcards, e.g. searching for a title relaxing yields results "Relaxing view of blue whales" or
"How relaxing is this?" - Specific named queries are created for these, e.g.

    @NamedQuery(name = "Image.findByDescriptionWild", query = "SELECT i FROM Image i WHERE i.description LIKE ?1 ORDER BY i.iid ASC"),

User search is not case sensitive - shows the images the user has uploaded

Gallery view is sorted by newest to oldest images.
Gallery thumbnails scale based on screen resolution, but maintain the original aspect ratio.

Logged in specific:
Sign up button hidden
Log in button hidden
Log out button visible
My favourites button visible - shows the images the user has favourited
My pictures button visible - shows the images the user has uploaded

Image view screen:
Clicking the image thumbnail opens the full resolution image - makes sharing the URL easy
Facebook button - opens up the Facebook share
Twitter button - opens up the Twitter share
Random button - opens a image view of a random image
The average rating and amount of ratings

Logged in specific:
Favourite button - favourites or unfavourites the image, changes colour based on if the user has favourited the image
User can rate an image - average and total rating are updated immediately
