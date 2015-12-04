/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package imageRektDB;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Asus
 */
@Embeddable
public class RatePK implements Serializable {
    @Basic(optional = false)
    @NotNull
    @Column(name = "UID")
    private int uid;
    @Basic(optional = false)
    @NotNull
    @Column(name = "IID")
    private int iid;

    public RatePK() {
    }

    public RatePK(int uid, int iid) {
        this.uid = uid;
        this.iid = iid;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getIid() {
        return iid;
    }

    public void setIid(int iid) {
        this.iid = iid;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) uid;
        hash += (int) iid;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof RatePK)) {
            return false;
        }
        RatePK other = (RatePK) object;
        if (this.uid != other.uid) {
            return false;
        }
        if (this.iid != other.iid) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "databaseFiles.RatePK[ uid=" + uid + ", iid=" + iid + " ]";
    }
    
}
