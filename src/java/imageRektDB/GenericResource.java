/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package imageRektDB;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Random;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author Asus // edit description // get favourites JS
 *
 */
@Path("generic")
public class GenericResource {

    EntityManagerFactory emf;
    EntityManager em;
    JsonArray jsonImageArray;
    JsonArray emptyJsonArray;
    JsonObject jsonImageObject;
    JsonObjectBuilder jsonObjectBuilder;
    private int userSearchTerm = 0;
    private int imageRating = 0;
    private int userRating;
    private int searchUID;
    private int searchIID;
    private int searchTID;
    private int randomIID;
    private Random randomno;
    private ArrayList<Image> userImageArray;
    private ArrayList<String> userArrayList;
    private ArrayList<String> galleryImages;
    private ArrayList<Integer> imageRatings;
    private Collection<User> userCollection;
    private Collection<Image> imageCollection;
    private Collection<Comment> commentCollection;
    private Collection<Tag> tagCollection;
    private List<Image> userImageList;
    private List<Image> imageList;
    private List<Image> imageQuery;
    private List<Image> imageQueryJSON;
    private List<Rate> rateList;
    private List<User> userList;
    private List<Tag> tagList;
    private User newUser;
    private User queryUser;
    private Image foundImage;
    private Image queryImage;
    private Rate newRate;
    private Comment newComment;
    private Tag newTag;
    private Tag queryTag;

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */
    public GenericResource() {
    }

    /**
     * Retrieves representation of an instance of imageRektDB.GenericResource
     *
     * @return an instance of java.lang.String
     */
//    @GET
//    @Path("unused")
//    @Produces("application/xml")
//    public String getXml() {
//        //TODO return proper representation object
//        throw new UnsupportedOperationException();
//    }
    //js in place
    @GET
    @Path("checkUsername/{username}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String checkUsername(@PathParam("username") String username) {
        createTransaction();
        this.userList = em.createNamedQuery("User.findByUname").setParameter("uname", username).getResultList();
        if (this.userList.isEmpty()) {
            endTransaction();
            return "OK";
        } else {
            endTransaction();
            return "USED";
        }
    }

    // get image by iid
    @GET
    @Path("getImageByIID/{image}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public JsonArray getImageByIID(@PathParam("image") String iid) {
        this.searchIID = Integer.parseInt(iid);
        createTransaction();
        this.queryImage = (Image) em.createNamedQuery("Image.findByIid").setParameter("iid", this.searchIID).getSingleResult();
        // create a objectBuilder
        JsonObjectBuilder jsonImageObjectBuilder = Json.createObjectBuilder();
        // create a JsonObject
        jsonImageObject = jsonImageObjectBuilder.build();
        // create a JsonArrayBuilder
        JsonArrayBuilder jsonImageArrayBuilder = Json.createArrayBuilder();
        // loop through all the images and add them into the JsonObject
        jsonObjectBuilder = jsonImageObjectBuilder.add("path", this.queryImage.getPath());
        jsonObjectBuilder = jsonImageObjectBuilder.add("title", this.queryImage.getTitle());
        jsonObjectBuilder = jsonImageObjectBuilder.add("description", this.queryImage.getDescription());
        // build the JsonObject to finalize it
        jsonImageObject = jsonObjectBuilder.build();
        // add the JsonObject to the ArrayBuilder (same as adding it to the array)
        jsonImageArrayBuilder.add(jsonImageObject);
        // create a JsonArray from the JsonArrayBuilder
        jsonImageArray = Json.createArrayBuilder().add(jsonImageArrayBuilder).build();
        endTransaction();
        return jsonImageArray;
    }

    //for registering a new user from index.html
    @POST
    @Path("registerUser")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String registerUser(@FormParam("username") String username,
            @FormParam("email") String email,
            @FormParam("password") String password) {
        createTransaction();
        this.userList = em.createNamedQuery("User.findAll").getResultList();
        for (User u : this.userList) {
            if (u.getUname().equals(username)) {
                endTransaction();
                return "Username already found, add another username";
            }
        }
        newUser = new User();
        newUser.setUname(username);
        newUser.setUpass(password);
        newUser.setUemail(email);
        em.persist(newUser);
        // create query for finding the user just created
        for (User p : (List<User>) em.createQuery("SELECT c FROM User c WHERE c.uname LIKE :UNAME").setParameter("UNAME", username).getResultList()) {
            return "Found just created user from database " + p.getUname() + " with email " + p.getUemail() + " UID " + p.getUid();
        }
        endTransaction();
        //if the user creation failed
        return "Somethign went wrong! User with info was not created " + newUser.getUname() + " " + newUser.getUemail();
    }

    // add comment to image
    @GET
    @Path("commentImage/{comment}/{image}/{user}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String commentImage(@PathParam("comment") String comment,
            @PathParam("image") String iid,
            @PathParam("user") String uid) {
        createTransaction();
        this.searchIID = Integer.parseInt(iid);
        this.searchUID = Integer.parseInt(uid);
        // find all users and images
        this.userList = em.createNamedQuery("User.findAll").getResultList();
        this.imageQuery = em.createNamedQuery("Image.findAll").getResultList();
        // finding the user in question
        for (User u : this.userList) {
            if (u.getUid() == this.searchUID) {
                this.queryUser = u;
            }
        }
        // find the image in question
        for (Image i : this.imageQuery) {
            if (i.getIid() == this.searchIID) {
                this.queryImage = i;
            }
        }
        // create the new comment
        newComment = new Comment(new Date(), comment, this.queryImage, this.queryUser);
        em.persist(newComment);
        endTransaction();
        return "Comment added";
    }

    //js in place
    //get image comments
    @GET
    @Path("getImageComments/{image}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces("application/json")
    public JsonArray getImageComments(@PathParam("image") String IID) {
        this.searchIID = Integer.parseInt(IID);
        createTransaction();
        this.imageQuery = em.createNamedQuery("Image.findAll").getResultList();
        // setting image as null so if there is no image, it can be checked
        // creating an empty jsonArray to return in case image is not found
        this.queryImage = null;
        this.emptyJsonArray = Json.createArrayBuilder().add("Image couldnt be found").build();
        for (Image i : this.imageQuery) {
            if (i.getIid() == this.searchIID) {
                this.queryImage = i;
            }
        }
        // if the queryImage is still set as null = the image was not found from db
        if (this.queryImage == null) {
            endTransaction();
            return emptyJsonArray;
        }
        // create a objectBuilder
        JsonObjectBuilder jsonImageObjectBuilder = Json.createObjectBuilder();
        // create a JsonObject
        jsonImageObject = jsonImageObjectBuilder.build();
        // create a JsonArrayBuilder
        JsonArrayBuilder jsonImageArrayBuilder = Json.createArrayBuilder();
        // loop through all the comments in the img and add them into the JsonObject
        if (this.queryImage.getCommentCollection().size() >= 1) {
            for (Comment c : this.queryImage.getCommentCollection()) {
                jsonObjectBuilder = jsonImageObjectBuilder.add("comment", c.getContents());
                jsonObjectBuilder = jsonImageObjectBuilder.add("user", c.getUid().getUname());
                jsonObjectBuilder = jsonImageObjectBuilder.add("time", c.getCommenttime().toString());
                // build the JsonObject to finalize it
                jsonImageObject = jsonObjectBuilder.build();
                // add the JsonObject to the ArrayBuilder (same as adding it to the array)
                jsonImageArrayBuilder.add(jsonImageObject);
            }
        } else {
            this.emptyJsonArray = Json.createArrayBuilder().add("No comments").build();
            endTransaction();
            return this.emptyJsonArray;
        }
        // create a JsonArray from the JsonArrayBuilder
        jsonImageArray = Json.createArrayBuilder().add(jsonImageArrayBuilder).build();
        endTransaction();
        return jsonImageArray;
    }

    // favourite images
    // js in place
    @GET
    @Path("favouriteImage/{image}/{user}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String favouriteImage(@PathParam("image") String iid,
            @PathParam("user") String uid) {
        this.searchIID = Integer.parseInt(iid);
        this.searchUID = Integer.parseInt(uid);
        createTransaction();
        this.userList = em.createNamedQuery("User.findAll").getResultList();
        this.imageQuery = em.createNamedQuery("Image.findAll").getResultList();
        // finding the user in question
        for (User u : this.userList) {
            if (u.getUid() == this.searchUID) {
                this.queryUser = u;
            }
        }
        // find the image in question
        for (Image i : this.imageQuery) {
            if (i.getIid() == this.searchIID) {
                this.queryImage = i;
            }
        }
        // set the users fav images into the imageCollection
        // add the current image to that collection
        this.imageCollection = this.queryUser.getImageCollection();
        this.imageCollection.add(this.queryImage);
        // set the images users who've fav it to userCollection
        // add the current user to that collection        
        this.userCollection = this.queryImage.getUserCollection();
        this.userCollection.add(this.queryUser);
        // set the updated fav lists for both user and image
        this.queryImage.setUserCollection(this.userCollection);
        this.queryUser.setImageCollection(this.imageCollection);
        endTransaction();
        return "Favourited image " + this.queryImage.getPath() + " for user " + this.queryUser.getUname();
    }

    //unfavorite image
    // js in place
    @GET
    @Path("unfavouriteImage/{image}/{user}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String unfavouriteImage(@PathParam("image") String iid,
            @PathParam("user") String uid) {
        this.searchIID = Integer.parseInt(iid);
        this.searchUID = Integer.parseInt(uid);
        createTransaction();
        this.queryImage = (Image) em.createNamedQuery("Image.findByIid").setParameter("iid", this.searchIID).getSingleResult();
        this.queryUser = (User) em.createNamedQuery("User.findByUid").setParameter("uid", this.searchUID).getSingleResult();

        // get the imageCollection from user and remove the image, then set it again
        this.imageCollection = this.queryUser.getImageCollection();
        this.imageCollection.remove(this.queryImage);
        this.queryUser.setImageCollection(this.imageCollection);

        // get the userCollection from the image and remove the user, then set it again
        this.userCollection = this.queryImage.getUserCollection();
        this.userCollection.remove(this.queryUser);
        this.queryImage.setUserCollection(this.userCollection);

        endTransaction();
        return "Removed image " + this.queryImage.getPath() + " from user " + this.queryUser.getUname() + " favourites.";
    }

    //find users favourite images
    // js in place
    @GET
    @Path("getFavourites/{user}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces("application/json")
    public JsonArray getFavourites(@PathParam("user") String uid) {
        this.searchUID = Integer.parseInt(uid);
        createTransaction();
        this.userList = em.createNamedQuery("User.findAll").getResultList();
        // setting user as null, if there is no user, it can be checked
        // creating an empty jsonArray to return in case user is not found
        this.queryUser = null;
        this.emptyJsonArray = Json.createArrayBuilder().build();
        for (User u : this.userList) {
            if (u.getUid() == this.searchUID) {
                this.queryUser = u;
            }
        }
        // if the queryUser is still set as null = the user was not found from db
        if (this.queryUser == null) {
            endTransaction();
            return emptyJsonArray;
        }
        // create a objectBuilder
        JsonObjectBuilder jsonImageObjectBuilder = Json.createObjectBuilder();
        // create a JsonObject
        // jsonImageObject = jsonImageObjectBuilder.build();
        // create a JsonArrayBuilder
        JsonArrayBuilder jsonImageArrayBuilder = Json.createArrayBuilder();
        // loop through all the images in users fav image collection and add them into the JsonObject
        for (Image i : this.queryUser.getImageCollection()) {
            jsonObjectBuilder = jsonImageObjectBuilder.add("path", i.getPath());
            jsonObjectBuilder = jsonImageObjectBuilder.add("title", i.getTitle());
            // build the JsonObject to finalize it
            //jsonImageObject = jsonObjectBuilder.build();
            jsonImageObject = jsonImageObjectBuilder.build();
            // add the JsonObject to the ArrayBuilder (same as adding it to the array)
            jsonImageArrayBuilder.add(jsonImageObject);
        }
        // create a JsonArray from the JsonArrayBuilder
        //jsonImageArray = Json.createArrayBuilder().add(jsonImageArrayBuilder).build();
        jsonImageArray = jsonImageArrayBuilder.build();
        endTransaction();
        return jsonImageArray;
    }

    //create or update image rating
    @GET
    @Path("rateImage/{user}/{image}/{rate}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String rateImage(@PathParam("image") String iid,
            @PathParam("rate") String rate,
            @PathParam("user") String uid) {
        // changing the search queries to integers
        this.searchUID = Integer.parseInt(uid);
        this.searchIID = Integer.parseInt(iid);
        this.userRating = Integer.parseInt(rate);
        createTransaction();
        // getting all ratings
        this.rateList = em.createNamedQuery("Rate.findAll").getResultList();
        // loops through the ratings, if a rating for the image for the user
        // can be found, then the rating is updated
        // otherwise creates a new rating
        for (Rate r : this.rateList) {
            if (r.getImage().getIid() == this.searchIID && r.getUser().getUid() == this.searchUID) {
                r.setRating(this.userRating);
                endTransaction();
                return "CHANGED";
            }
        }
        //create new rating if necessary
        newRate = new Rate(this.searchUID, this.searchIID);
        newRate.setRating(userRating);
        em.persist(newRate);
        endTransaction();
        return "NEW";
    }

    // checks the rating of an image by IID
    @GET
    @Path("checkRating/{image}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String checkRating(@PathParam("image") String iid) {
        createTransaction();
        this.imageRatings = new ArrayList();
        this.searchIID = Integer.parseInt(iid);
        this.rateList = em.createNamedQuery("Rate.findByIid").setParameter("iid", this.searchIID).getResultList();
        if (this.rateList.size() < 1) {
            endTransaction();
            return "no rating";
        }
        for (Rate r : this.rateList) {
            this.imageRating += r.getRating();
        }
        endTransaction();
        return "" + this.imageRating / this.rateList.size();
    }

    // gets username and password and checks if matching user is found
    @GET
    @Path("checkUserLogin/{user}/{password}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String checkUserLogin(@PathParam("user") String username,
            @PathParam("password") String password) {
        createTransaction();
        this.userList = em.createNamedQuery("User.findAll").getResultList();
        for (User u : this.userList) {
            if (u.getUname().equals(username) && u.getUpass().equals(password)) {
                return "" + u.getUid();
            }
        }
        return "false";
    }

    //find user uploaded images
    @POST
    @Path("findUserImages")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces("application/json")
    public JsonArray findUserImages(@FormParam("uid") String uid) {
        this.userImageArray = new ArrayList();
        this.searchUID = Integer.parseInt(uid);
        createTransaction();
        this.userList = em.createNamedQuery("User.findByUid").setParameter("uid", this.searchUID).getResultList();
        this.imageQuery = em.createNamedQuery("Image.findAll").getResultList();
        // setting user as null, if there is no user, it can be checked
        // creating an empty jsonArray to return in case user is not found
        this.queryUser = null;
        this.emptyJsonArray = Json.createArrayBuilder().add("User not found").build();
        for (User u : this.userList) {
            if (u.getUid() == this.searchUID) {
                this.queryUser = u;
            }
        }
        // if the queryUser is still set as null = the user was not found from db
        if (this.queryUser == null) {
            endTransaction();
            return emptyJsonArray;
        }
        for (Image img : imageQuery) {
            if (img.getUid() == this.queryUser) {
                this.userImageArray.add(img);
            }
        }
        // create a objectBuilder
        JsonObjectBuilder jsonImageObjectBuilder = Json.createObjectBuilder();
        // create a JsonObject
        jsonImageObject = jsonImageObjectBuilder.build();
        // create a JsonArrayBuilder
        JsonArrayBuilder jsonImageArrayBuilder = Json.createArrayBuilder();
        // loop through all the images in users fav image collection and add them into the JsonObject
        for (Image img : this.userImageArray) {
            jsonObjectBuilder = jsonImageObjectBuilder.add("path", img.getPath());
            jsonObjectBuilder = jsonImageObjectBuilder.add("title", img.getTitle());
            jsonObjectBuilder = jsonImageObjectBuilder.add("user", img.getUid().toString());
            // build the JsonObject to finalize it
            jsonImageObject = jsonObjectBuilder.build();
            // add the JsonObject to the ArrayBuilder (same as adding it to the array)
            jsonImageArrayBuilder.add(jsonImageObject);
        }
        // create a JsonArray from the JsonArrayBuilder
        jsonImageArray = Json.createArrayBuilder().add(jsonImageArrayBuilder).add("Array " + this.userImageArray.size() + " size. " + " query user " + this.queryUser.getUid()).build();
        endTransaction();
        return jsonImageArray;
    }

    // find image(s) by title
    @GET
    @Path("findImageByTitle/{title}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public JsonArray findImageByName(@PathParam("title") String title) {
        createTransaction();
        this.imageQuery = em.createNamedQuery("Image.findByTitle").setParameter("title", title).getResultList();
        if (!this.imageQuery.isEmpty()) {
            JsonObjectBuilder jsonImageObjectBuilder = Json.createObjectBuilder();
            // create a JsonArrayBuilder
            JsonArrayBuilder jsonImageArrayBuilder = Json.createArrayBuilder();
            // loop through all the images in users fav image collection and add them into the JsonObject
            for (Image i : this.imageQuery) {
                jsonObjectBuilder = jsonImageObjectBuilder.add("title", i.getTitle());
                jsonObjectBuilder = jsonImageObjectBuilder.add("path", i.getPath());
                jsonObjectBuilder = jsonImageObjectBuilder.add("iid", i.getIid());
                // build the JsonObject to finalize it
                jsonImageObject = jsonImageObjectBuilder.build();
                // add the JsonObject to the ArrayBuilder (same as adding it to the array)
                jsonImageArrayBuilder.add(jsonImageObject);
            }
            // create a JsonArray from the JsonArrayBuilder
            this.jsonImageArray = jsonImageArrayBuilder.build();
        } else {
            this.emptyJsonArray = Json.createArrayBuilder().add("No images with title").build();
        }
        return jsonImageArray;
    }

    // find random image
    // js in place
    @GET
    @Path("findRandomImage")
    @Produces("application/json")
    public JsonArray findRandomImage() {
        createTransaction();
        this.imageList = em.createNamedQuery("Image.findAll").getResultList();
        this.randomno = new Random();
        this.randomIID = this.randomno.nextInt(this.imageList.size());
        this.queryImage = this.imageList.get(randomIID);
        JsonObjectBuilder jsonImageObjectBuilder = Json.createObjectBuilder();
        // create a JsonArrayBuilder
        JsonArrayBuilder jsonImageArrayBuilder = Json.createArrayBuilder();
        // loop through all the images in users fav image collection and add them into the JsonObject
        jsonObjectBuilder = jsonImageObjectBuilder.add("path", this.queryImage.getPath());
        jsonObjectBuilder = jsonImageObjectBuilder.add("title", this.queryImage.getTitle());
        jsonObjectBuilder = jsonImageObjectBuilder.add("iid", this.queryImage.getIid());
        // build the JsonObject to finalize it
        jsonImageObject = jsonImageObjectBuilder.build();
        // add the JsonObject to the ArrayBuilder (same as adding it to the array)
        jsonImageArrayBuilder.add(jsonImageObject);
        // create a JsonArray from the JsonArrayBuilder
        this.jsonImageArray = jsonImageArrayBuilder.build();
        return jsonImageArray;
    }

    @POST
    @Path("findUserByPK")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String findUserByPK(@FormParam("text") String text) {
        createTransaction();
        this.userSearchTerm = Integer.parseInt(text);
        for (User p : (List<User>) em.createQuery("SELECT c FROM User c WHERE c.uid LIKE :UID").setParameter("UID", this.userSearchTerm).getResultList()) {
            return "User found matching term " + this.userSearchTerm + " name " + p.getUname() + " email " + p.getUemail();
        }
        endTransaction();
        return "Nothing was found!";
    }

    // query to search for users
    @GET
    @Path("get_users")
    @Produces("text/html")
    public String getUsers() {
        try {
            createTransaction();
            List<User> userQuery = em.createNamedQuery("User.findAll").getResultList();
            userArrayList = new ArrayList();
            for (User u : userQuery) {
                userArrayList.add("User " + u.getUname() + " with email " + u.getUemail() + " and PK " + u.getUid() + " found <br>");
            }
            endTransaction();
            return userArrayList.toString();
        } catch (Exception e) {
            return "Something is broken, again. : " + e;
        }
    }

    // for getting a list of all the uploads stored in the DB
    @GET
    @Path("view_gallery")
    @Produces("text/html")
    public String viewGallery() {
        // create a transaction first
        createTransaction();
        // save the results in a list
        List<Image> images = em.createNamedQuery("Image.findAll").getResultList();
        // create a new arraylist
        galleryImages = new ArrayList();
        // add images into the arrayList
        for (Image i : images) {
            if (i.getPath().endsWith("jpg") || i.getPath().endsWith("png")) {
                galleryImages.add("Picture title " + i.getTitle() + "<br>" + "<img src=\"http://192.168.56.1/test/" + i.getPath() + "\" height=\"200\" width=\"200\"><br>" + "Uploader " + i.getUid().getUname() + " <br>");
            } else {
                galleryImages.add("Found upload with title " + i.getTitle() + " that is not an image <br>.");
            }
        }
        // end the transaction
        endTransaction();
        // return the ArrayList with the html tags
        return galleryImages.toString();
    }

    // creates a new tag, doesn't check if the tag already appears
    // returns the tag id when the tag is created
    @POST
    @Path("createTag")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String addTag(@FormParam("tag") String tagContent) {
        createTransaction();
        this.newTag = new Tag(tagContent);
        em.persist(this.newTag);
        this.queryTag = (Tag) em.createNamedQuery("Tag.findByTcontent").setParameter("tcontent", tagContent).getSingleResult();
        this.searchTID = this.queryTag.getTid();
        endTransaction();
        return "New tag created. " + this.searchTID;
    }

    // find tag ID
    // js in place
    @GET
    @Path("findTagID/{tagContent}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String findTagID(@PathParam("tagContent") String tagContent) {
        createTransaction();
        this.tagList = em.createNamedQuery("Tag.findAll").getResultList();
        for (Tag t : this.tagList) {
            if (t.getTcontent().equalsIgnoreCase("#" + tagContent)) {
                endTransaction();
                return "" + t.getTid();
            }
        }
        endTransaction();
        return "no_tag";
    }

    // check if the tag exists or not
    // if it exists returns the tag id
    @POST
    @Path("checkTag")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String checkTag(@FormParam("tag") String tagContent) {
        createTransaction();
        this.tagList = em.createNamedQuery("Tag.findAll").getResultList();
        for (Tag t : this.tagList) {
            if (t.getTcontent().equalsIgnoreCase(tagContent)) {
                this.searchTID = t.getTid();
                endTransaction();
                return "" + this.searchTID;
            }
        }
        endTransaction();
        return "Tag doesn't exist";
    }

    // add tag to image
    @POST
    @Path("addTagToImage")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String addTagToImage(@FormParam("IID") String iid,
            @FormParam("TID") String tid) {
        this.searchIID = Integer.parseInt(iid);
        this.searchTID = Integer.parseInt(tid);
        createTransaction();
        this.queryImage = (Image) em.createNamedQuery("Image.findByIid").setParameter("iid", this.searchIID).getSingleResult();
        this.queryTag = (Tag) em.createNamedQuery("Tag.findByTid").setParameter("tid", this.searchTID).getSingleResult();

        this.tagCollection = this.queryImage.getTagCollection();
        this.tagCollection.add(this.queryTag);
        this.queryImage.setTagCollection(this.tagCollection);

        this.imageCollection = this.queryTag.getImageCollection();
        this.imageCollection.add(this.queryImage);
        this.queryTag.setImageCollection(this.imageCollection);
        endTransaction();
        return "tag added";
    }

    // find images by tag, use tag id to searc
    // returns JSON array of images, or if no imgs have the tag
    // then returns "no imgs"
    // js in place
    @GET
    @Path("findImageByTag/{tag}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public JsonArray findImageByTag(@PathParam("tag") String tid) {
        this.searchTID = Integer.parseInt(tid);
        createTransaction();
        this.queryTag = (Tag) em.createNamedQuery("Tag.findByTid").setParameter("tid", this.searchTID).getSingleResult();

        this.imageCollection = this.queryTag.getImageCollection();
        if (!this.imageCollection.isEmpty()) {
            JsonObjectBuilder jsonImageObjectBuilder = Json.createObjectBuilder();
            // create a JsonArrayBuilder
            JsonArrayBuilder jsonImageArrayBuilder = Json.createArrayBuilder();
            // loop through all the images in users fav image collection and add them into the JsonObject
            for (Image i : this.imageCollection) {
                jsonObjectBuilder = jsonImageObjectBuilder.add("path", i.getPath());
                jsonObjectBuilder = jsonImageObjectBuilder.add("title", i.getTitle());
                jsonObjectBuilder = jsonImageObjectBuilder.add("iid", i.getIid());
                // build the JsonObject to finalize it
                jsonImageObject = jsonImageObjectBuilder.build();
                // add the JsonObject to the ArrayBuilder (same as adding it to the array)
                jsonImageArrayBuilder.add(jsonImageObject);
            }
            // create a JsonArray from the JsonArrayBuilder
            this.jsonImageArray = jsonImageArrayBuilder.build();
        } else {
            this.emptyJsonArray = Json.createArrayBuilder().add("no imgs").build();
            endTransaction();
            return this.emptyJsonArray;
        }
        endTransaction();
        return this.jsonImageArray;
    }

    /**
     * PUT method for updating or creating an instance of GenericResource
     *
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/xml")
    public void putXml(String content
    ) {
    }

    // js in place
    @GET
    @Path("get_json_gallery")
    @Produces("application/json")
    public JsonArray getJsonArray() {
        // create a transaction first
        createTransaction();
        // save the results in a list
        List<Image> images = em.createNamedQuery("Image.findAll").getResultList();
        // create a objectBuilder
        JsonObjectBuilder jsonImageObjectBuilder = Json.createObjectBuilder();
        // create a JsonObject
        jsonImageObject = jsonImageObjectBuilder.build();
        // create a JsonArrayBuilder
        JsonArrayBuilder jsonImageArrayBuilder = Json.createArrayBuilder();
        // loop through all the images and add them into the JsonObject
        for (Image i : images) {
            jsonObjectBuilder = jsonImageObjectBuilder.add("path", i.getPath());
            jsonObjectBuilder = jsonImageObjectBuilder.add("title", i.getTitle());
            jsonObjectBuilder = jsonImageObjectBuilder.add("iid", i.getIid());
            // build the JsonObject to finalize it
            jsonImageObject = jsonObjectBuilder.build();
            // add the JsonObject to the ArrayBuilder (same as adding it to the array)
            jsonImageArrayBuilder.add(jsonImageObject);
        }
        // create a JsonArray from the JsonArrayBuilder
        jsonImageArray = Json.createArrayBuilder().add(jsonImageArrayBuilder).build();
        endTransaction();
        return jsonImageArray;
    }

    public void createTransaction() {
        emf = Persistence.createEntityManagerFactory("ImageRektPU");
        em = emf.createEntityManager();
        em.getTransaction().begin();
    }

    public void endTransaction() {
        em.getTransaction().commit();
        emf.close();
    }
}
