package com.zpms.demo.Register;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Entity
@Table(name = "schools_info")
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotBlank(message = "Organization name is required")
    private String organizationName;

    @NotBlank(message = "School name is required")
    private String schoolName;

    @Pattern(regexp = "\\d{11}", message = "UDISE must be an 11-digit number")
    private String udiseNumber;

    @Pattern(regexp = "^(https?://.*)?$", message = "Must be a valid URL")
    private String googleLocationLink;

    private String category;

    @Size(max = 255, message = "Address should not exceed 255 characters")
    private String fullAddress;

    @NotBlank(message = "Taluka is required")
    private String taluka;

    @NotBlank(message = "District is required")
    private String district;

    @Pattern(regexp = "\\d{6}", message = "Pincode must be a 6-digit number")
    private String pincode;

    @NotBlank(message = "Headmaster's name is required")
    private String headmastersName;

    @NotBlank(message = "Headmaster's mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Mobile number must be a valid 10-digit Indian number")
    private String headmastersMobileNumber;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getUdiseNumber() {
        return udiseNumber;
    }

    public void setUdiseNumber(String udiseNumber) {
        this.udiseNumber = udiseNumber;
    }

    public String getGoogleLocationLink() {
        return googleLocationLink;
    }

    public void setGoogleLocationLink(String googleLocationLink) {
        this.googleLocationLink = googleLocationLink;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }

    public String getTaluka() {
        return taluka;
    }

    public void setTaluka(String taluka) {
        this.taluka = taluka;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getHeadmastersName() {
        return headmastersName;
    }

    public void setHeadmastersName(String headmastersName) {
        this.headmastersName = headmastersName;
    }

    public String getHeadmastersMobileNumber() {
        return headmastersMobileNumber;
    }

    public void setHeadmastersMobileNumber(String headmastersMobileNumber) {
        this.headmastersMobileNumber = headmastersMobileNumber;
    }
}
