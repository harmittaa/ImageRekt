/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package imageRektDB;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Asus
 */
@Entity
@Table(name = "COMMENT")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Comment.findAll", query = "SELECT c FROM Comment c"),
    @NamedQuery(name = "Comment.findByCid", query = "SELECT c FROM Comment c WHERE c.cid = :cid"),
    @NamedQuery(name = "Comment.findByContents", query = "SELECT c FROM Comment c WHERE c.contents = :contents"),
    @NamedQuery(name = "Comment.findByCommenttime", query = "SELECT c FROM Comment c WHERE c.commenttime = :commenttime")})
public class Comment implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    // added by matti
    @GeneratedValue(strategy = GenerationType.IDENTITY)    
    // @NotNull
    @Column(name = "CID")
    private Integer cid;
    @Size(max = 140)
    @Column(name = "CONTENTS")
    private String contents;
    @Basic(optional = false)
    @NotNull
    @Column(name = "COMMENTTIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date commenttime;
    @JoinColumn(name = "IID", referencedColumnName = "IID")
    @ManyToOne
    private Image iid;
    @JoinColumn(name = "UID", referencedColumnName = "UID")
    @ManyToOne
    private User uid;

    public Comment() {
    }

    public Comment(Integer cid) {
        this.cid = cid;
    }

    public Comment(Integer cid, Date commenttime) {
        this.cid = cid;
        this.commenttime = commenttime;
    }
    
    //added by matti
    public Comment(Date commenttime, String contents, Image iid, User uid) {
        this.commenttime = commenttime;
        this.contents = contents;
        this.iid = iid;
        this.uid = uid;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public Date getCommenttime() {
        return commenttime;
    }

    public void setCommenttime(Date commenttime) {
        this.commenttime = commenttime;
    }

    public Image getIid() {
        return iid;
    }

    public void setIid(Image iid) {
        this.iid = iid;
    }

    public User getUid() {
        return uid;
    }

    public void setUid(User uid) {
        this.uid = uid;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cid != null ? cid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Comment)) {
            return false;
        }
        Comment other = (Comment) object;
        if ((this.cid == null && other.cid != null) || (this.cid != null && !this.cid.equals(other.cid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "imageRektDB.Comment[ cid=" + cid + " ]";
    }
    
}
