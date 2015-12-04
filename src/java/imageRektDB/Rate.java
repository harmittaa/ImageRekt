/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package imageRektDB;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Asus
 */
@Entity
@Table(name = "RATE")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Rate.findAll", query = "SELECT r FROM Rate r"),
    @NamedQuery(name = "Rate.findByUid", query = "SELECT r FROM Rate r WHERE r.ratePK.uid = :uid"),
    @NamedQuery(name = "Rate.findByIid", query = "SELECT r FROM Rate r WHERE r.ratePK.iid = :iid"),
    @NamedQuery(name = "Rate.findByRating", query = "SELECT r FROM Rate r WHERE r.rating = :rating")})
public class Rate implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected RatePK ratePK;
    @Column(name = "RATING")
    private Integer rating;
    @JoinColumn(name = "IID", referencedColumnName = "IID", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Image image;
    @JoinColumn(name = "UID", referencedColumnName = "UID", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private User user;

    public Rate() {
    }

    public Rate(RatePK ratePK) {
        this.ratePK = ratePK;
    }

    public Rate(int uid, int iid) {
        this.ratePK = new RatePK(uid, iid);
    }

    public RatePK getRatePK() {
        return ratePK;
    }

    public void setRatePK(RatePK ratePK) {
        this.ratePK = ratePK;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (ratePK != null ? ratePK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Rate)) {
            return false;
        }
        Rate other = (Rate) object;
        if ((this.ratePK == null && other.ratePK != null) || (this.ratePK != null && !this.ratePK.equals(other.ratePK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "databaseFiles.Rate[ ratePK=" + ratePK + " ]";
    }
    
}
