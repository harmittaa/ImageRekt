package imageRektDB;

import imageRektDB.Comment;
import imageRektDB.Image;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-12-04T16:28:09")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile SingularAttribute<User, Integer> uid;
    public static volatile CollectionAttribute<User, Image> imageCollection1;
    public static volatile CollectionAttribute<User, Comment> commentCollection;
    public static volatile SingularAttribute<User, String> uname;
    public static volatile SingularAttribute<User, Image> iid;
    public static volatile SingularAttribute<User, String> uemail;
    public static volatile SingularAttribute<User, String> upass;
    public static volatile CollectionAttribute<User, Image> imageCollection;

}