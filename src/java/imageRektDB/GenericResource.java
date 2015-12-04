/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package imageRektDB;

import java.util.ArrayList;
import java.util.List;
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
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author Asus
 */
@Path("generic")
public class GenericResource {

    EntityManagerFactory emf;
    EntityManager em;
    JsonArray jsonImageArray;
    JsonObject jsonImageObject;
    JsonObjectBuilder jsonObjectBuilder;
    private Boolean userFound = false;
    private User newUser;
    private int i = 0;
    private int userSearchTerm = 0;
    private List<Image> imageQuery;
    private List<Image> imageQueryJSON;
    private List<User> userList;
    private ArrayList<String> userArrayList;
    private ArrayList<String> galleryImages;
    private User queryUser;
    private Image queryImage;
    private int userRating;
    private int searchUID;
    private int searchIID;

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
    @GET
    @Path("unused")
    @Produces("application/xml")
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
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
    
    @POST
    @Path("rateImage")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String rateImage (@FormParam("IID") String iid,
                             @FormParam("rate") String rate,
                             @FormParam("UID") String uid) {
        // changing the search queries to integers
        this.searchUID = Integer.parseInt(uid);
        this.searchIID = Integer.parseInt(iid);
        createTransaction();
        // getting all users
        this.userList = em.createNamedQuery("User.findAll").getResultList();
        // finding the user
        for (User u : this.userList) {
            if (u.getUid() == this.searchUID) {
                this.queryUser = u;
            }
        }
        
        this.imageQuery = em.createNamedQuery("Image.findAll").getResultList();
        for (Image i: this.imageQuery) {
            if (i.getIid() == this.searchIID) {
                this.queryImage = i;
            }
        }
        
        
        
        return "placeholder";
    } 
    
    // gets username and password and checks if matching user is found
    @POST
    @Path("checkUserLogin")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String checkUserLogin(@FormParam("username") String username,
                                 @FormParam("password") String password) {
        
        createTransaction();
        this.userList = em.createNamedQuery("User.findAll").getResultList();
        for (User u : this.userList) {
            if (u.getUname().equals(username) && u.getUpass().equals(password)) {
                return "Logged in as user " + u.getUname() + ".";
            }
        }
        
        return "User " + username + " wasn't found in the database.";
    }

    @POST
    @Path("findUserImages")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String findUserImages(@FormParam("uid") String uid) {
        createTransaction();
        this.userSearchTerm = Integer.parseInt(uid);
        for (User p : (List<User>) em.createQuery("SELECT c FROM User c WHERE c.uid LIKE :UID").setParameter("UID", this.userSearchTerm).getResultList()) {
            queryUser = p;
        }
        // save all the images into the image 
        imageQuery = em.createNamedQuery("Image.findAll").getResultList();
        ArrayList<Image> userImages = new ArrayList();
        for (Image i : imageQuery) {
            if (i.getUid() == queryUser) {
                userImages.add(i);
            }
        }
        endTransaction();
        return userImages.toString();
    }

    // doesnt work
    @POST
    @Path("findUserImagesJSON")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces("application/json")
    public JsonArray findUserImagesJSON(@FormParam("uid") String uid) {
        createTransaction();
        this.userSearchTerm = Integer.parseInt(uid);
        for (User p : (List<User>) em.createQuery("SELECT c FROM User c WHERE c.uid LIKE :UID").setParameter("UID", this.userSearchTerm).getResultList()) {
            queryUser = p;
        }
        imageQueryJSON = em.createNamedQuery("Image.findAll").getResultList();
        imageQueryJSON = em.createQuery("SELECT i FROM Image i WHERE Image.uid LIKE :UID").setParameter("UID", 1).getResultList();
        for (Image b : imageQueryJSON) {
            if (b.getUid() != queryUser) {
                imageQueryJSON.remove(b);
            }
        }
        // create a objectBuilder
        JsonObjectBuilder jsonImageObjectBuilder = Json.createObjectBuilder();
        // create a JsonObject
        jsonImageObject = jsonImageObjectBuilder.build();
        // create a JsonArrayBuilder
        JsonArrayBuilder jsonImageArrayBuilder = Json.createArrayBuilder();
        // loop through all the images and add them into the JsonObject
        for (Image i : imageQueryJSON) {
            jsonObjectBuilder = jsonImageObjectBuilder.add("path", i.getPath());
            jsonObjectBuilder = jsonImageObjectBuilder.add("title", i.getTitle());
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

    @POST
    @Path("findImageByName")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces("text/html")
    public String findImageByName(@FormParam("imagename") String imagename) {
        createTransaction();
        for (Image u : (List<Image>) em.createQuery("SELECT i FROM Image i WHERE i.title LIKE :title").setParameter("title", imagename).getResultList()) {
            return "Found image with title " + imagename + "<br>" + "<img src=\"http://192.168.56.1/test/" + u.getPath() + "\" height=\"42\" width=\"42\"><br>";
        }
        endTransaction();
        return "Image with title couldn't be found";
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

    @GET
    @Path("get_json")
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
