package com.zpms.demo.Register;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table
public class UserRegister {
        @Id
        @GeneratedValue 
         private Long id;
  private String fullName;
    private String email;
    private String mobile;
    private String password;
    private String department;
    private String role;
    private String photoPath;

        public Long getId() {
                return id;
        }
        public void setId(Long id) {
                this.id = id;
        }
        public String getFullName() {
                return fullName;
        }
        public void setFullName(String fullName) {
                this.fullName = fullName;
        }
        public String getEmail() {
                return email;
        }
        public void setEmail(String email) {
                this.email = email;
        }
        public String getMobile() {
                return mobile;
        }

        public void setMobile(String mobile) {
                this.mobile = mobile;
        }
        public String getPassword() {
                return password;
        }
        public void setPassword(String password) {
                this.password = password;
        }
        public String getDepartment() {
                return department;
        }
        public void setDepartment(String department) {
                this.department = department;
        }
        public String getRole() {
                return role;
        }
        public void setRole(String role) {
                this.role = role;
        }
        public String getPhotoPath() {
                return photoPath;
        }
        public void setPhotoPath(String photoPath) {
                this.photoPath = photoPath;
        }
        @Override
        public String toString() {
                return "UserRegister [id=" + id + ", fullName=" + fullName + ", email=" + email + ", mobile=" + mobile
                                + ", password=" + password + ", department=" + department + ", role=" + role
                                + ", photoPath=" + photoPath + "]";
        }

}
