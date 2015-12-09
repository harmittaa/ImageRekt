package imageRektServlet;

import imageRektDB.Image;
import imageRektDB.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author patricka
 */
@WebServlet(name = "upload", urlPatterns = {"/upload"})
// save images here, so that they can be easily accessed from outside
@MultipartConfig(location = "/var/www/html/test/")
public class FileUploadServlet extends HttpServlet {

    EntityManagerFactory emf;
    EntityManager em;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        try {
            request.getPart("file").write(request.getPart("file").getSubmittedFileName());
            out.println("File uploaded successfully! " + request.getPart("file").getSubmittedFileName());
        } catch (Exception e) {
            out.println("Exception -->" + e.getMessage());
        } finally {
        }

        //create a new transaction to add data about the image upload to DB.
        emf = Persistence.createEntityManagerFactory("ImageRektPU");
        em = emf.createEntityManager();
        out.println("Still works<br>");
        out.println("Transaction created<br>");
        try {
            em.getTransaction().begin();
            out.println("Transaction created<br>");
//            int fileuploader = Integer.parseInt(request.getParameter("fileuploader"));
            User u = (User) em.createNamedQuery("User.findByUid").setParameter("uid", 1).getSingleResult();
            out.println(u.getUname() + "<br>");
            //image title, description, Date generated in java the name of the file
//            Image img = new Image(request.getParameter("titleinput"), request.getParameter("descriptioninput"), new Date(), request.getPart("file").getSubmittedFileName(), u);
            Image img = new Image(request.getParameter("titleinput"), request.getParameter("descriptioninput"), new Date(), request.getPart("file").getSubmittedFileName(), u);
            out.println(img.getTitle() + "<br>");
            em.persist(img);
            em.getTransaction().commit();
            out.println("File in DB successfully!");
        } catch (Exception e) {
            out.println("BOOM! " + e);
        }
        emf.close();
    }
}