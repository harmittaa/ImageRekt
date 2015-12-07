package imageRektDB;

import imageRektDB.Image;
import imageRektDB.RatePK;
import imageRektDB.User;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-12-04T16:28:09")
@StaticMetamodel(Rate.class)
public class Rate_ { 

    public static volatile SingularAttribute<Rate, RatePK> ratePK;
    public static volatile SingularAttribute<Rate, Image> image;
    public static volatile SingularAttribute<Rate, Integer> rating;
    public static volatile SingularAttribute<Rate, User> user;

}