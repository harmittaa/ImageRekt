package imageRektServlet;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/**
 *
 * @author patricka
 */
@WebServlet(name = "Upload", urlPatterns = {"/upload"})
//@MultipartConfig(location = "/tmp")
@MultipartConfig(location = "/home/matti/Desktop/glassfish4/glassfish/domains/domain1/applications/uploads")
public class FileUploadServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        try {
            request.getPart("file").write(getFilename(request.getPart("file")));
            out.println("File uploaded successfully!");
        } catch (Exception e) {
            out.println("Exception -->" + e.getMessage());
        } finally {
            out.close();
        }
    }
    
    //from http://stackoverflow.com/questions/2422468/how-to-upload-files-to-server-using-jsp-servlet/2424824#2424824
    private static String getFilename(Part part) {
        for (String cd : part.getHeader("content-disposition").split(";")) {
            if (cd.trim().startsWith("filename")) {
                String filename = cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
                return filename.substring(filename.lastIndexOf('/') + 1).substring(filename.lastIndexOf('\\') + 1); // MSIE fix.
            }
        }
        return null;
    }
}
