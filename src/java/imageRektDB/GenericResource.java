/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package imageRektDB;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import static javax.ws.rs.HttpMethod.POST;
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
    private int i = 0;
    private String userListStart = "Found " + i + " users from database \n";
    private String userList = "";
    private String newLine = "\n";
    private String username = "";
    private String userMail = "";
    private int userPK = 0;


    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */
    public GenericResource() {
    }

    /**
     * Retrieves representation of an instance of imageRektDB.GenericResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("unused")
    @Produces("application/xml")
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }
    
   /* @POST
    @Path("test")
    @Consumes("multipart/form-data")
    public String testMethod() {
        emf = Persistence.createEntityManagerFactory("ImageRektPU");
        em = emf.createEntityManager();
        em.getTransaction().begin();
        this.userPK = Integer.parseInt("15");
        User newUser = new User(this.userPK);
        newUser.setUname("unamefromtest");
        newUser.setUpass("passfromtest");
        newUser.setUemail("fromtestmethod");
        em.persist(newUser);
        em.getTransaction().commit();
        return "filename";
    }
    */
    
    //for registering a new user from index.html
    @POST
    @Path("registerUser")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String registerUser(@FormParam("username") String username,
                                @FormParam("email") String email,
                                @FormParam("password") String password,
                                @FormParam("pk") String pk){
        emf = Persistence.createEntityManagerFactory("ImageRektPU");
        em = emf.createEntityManager();
        em.getTransaction().begin();
        this.userPK = Integer.parseInt(pk);
        User newUser = new User(this.userPK);
        newUser.setUname(username);
        newUser.setUpass(password);
        newUser.setUemail(email);
        em.persist(newUser);
        em.getTransaction().commit();
        
        // create query for finding the user just created
        for (User p : (List<User>) em.createQuery("SELECT c FROM User c WHERE c.uid LIKE :UID").setParameter("UID", this.userPK).getResultList()) {
            return "Found just created user from database " + p.getUname() + " with email " + p.getUemail();
        }
        em.close();
        emf.close();
        //if something goes wrong
        return "Somethign went wrong! " + newUser.getUname() + " " + newUser.getUemail();
    }
    
   
    // query to search for users
    @GET
    @Path("get_users")
    @Produces("text/plain")
    public String getUsers() {
        try {
            emf = Persistence.createEntityManagerFactory("ImageRektPU");
            em = emf.createEntityManager();
            for (User p : (List<User>) em.createNamedQuery("User.findAll").getResultList()) {
                i++;
                this.userList = this.userList + p.getUname() + p.getUemail() + this.newLine;
                return ("Total users found: " + i + " username found: " + p.getUname()+ " with email " + p.getUemail());
            }
            em.close();
            emf.close();
           // return "" + this.userListStart + this.userList;
        } catch (Exception e) {
            return "Something is broken, again. : " + e;
        }
        return "Something went wrong";
    }

    /**
     * PUT method for updating or creating an instance of GenericResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/xml")
    public void putXml(String content) {
    }
}
