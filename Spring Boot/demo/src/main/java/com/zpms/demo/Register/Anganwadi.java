package com.zpms.demo.Register;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

@Entity
@Table(name = "anganwadi_information")
public class Anganwadi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate entryDate;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "beat_name")
    private String beatName;

    @Column(name = "anganwadi_center_name", nullable = false)
    @NotBlank(message = "अंगणवाडी केंद्राचे नाव आवश्यक आहे")
    private String anganwadiCenterName;

    @Column(name = "anganwadi_number")
    private String anganwadiNumber;

    @Column(name = "anganwadi_worker_name", nullable = false)
    @NotBlank(message = "अंगणवाडी सेविकाचे नाव आवश्यक आहे")
    private String anganwadiWorkerName;

    @Column(name = "worker_mobile_number")
    @Pattern(regexp = "^[0-9]{10}$", message = "कृपया वैध १० अंकी मोबाईल नंबर प्रविष्ट करा.")
    private String workerMobileNumber;

    @Column(name = "worker_service_duration_years")
    private String workerServiceDurationYears;

    @Column(name = "worker_responsibility")
    private String workerResponsibility;

    @Column(name = "beneficiaries_0_6_months")
    @Min(value = 0, message = "लाभार्थी संख्या 0 पेक्षा कमी असू शकत नाही")
    private Integer beneficiaries0To6Months;

    @Column(name = "beneficiaries_total")
    @Min(value = 0, message = "एकूण लाभार्थी संख्या 0 पेक्षा कमी असू शकत नाही")
    private Integer beneficiariesTotal;

    @Column(name = "food_supply_6_months_3_years")
    private String foodSupply6Months3Years;

    @Column(name = "drinking_water_facility")
    private String drinkingWaterFacility;

    @Column(name = "educational_material_available")
    private String educationalMaterialAvailable;

    @Column(name = "toy_material_available")
    private String toyMaterialAvailable;

    @Column(name = "medical_checkup_facility")
    private String medicalCheckupFacility;

    @Lob
    private String remarks;

    // Default constructor for JPA
    public Anganwadi() {}

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getBeatName() {
        return beatName;
    }

    public void setBeatName(String beatName) {
        this.beatName = beatName;
    }

    public String getAnganwadiCenterName() {
        return anganwadiCenterName;
    }

    public void setAnganwadiCenterName(String anganwadiCenterName) {
        this.anganwadiCenterName = anganwadiCenterName;
    }

    public String getAnganwadiNumber() {
        return anganwadiNumber;
    }

    public void setAnganwadiNumber(String anganwadiNumber) {
        this.anganwadiNumber = anganwadiNumber;
    }

    public String getAnganwadiWorkerName() {
        return anganwadiWorkerName;
    }

    public void setAnganwadiWorkerName(String anganwadiWorkerName) {
        this.anganwadiWorkerName = anganwadiWorkerName;
    }

    public String getWorkerMobileNumber() {
        return workerMobileNumber;
    }

    public void setWorkerMobileNumber(String workerMobileNumber) {
        this.workerMobileNumber = workerMobileNumber;
    }

    public String getWorkerServiceDurationYears() {
        return workerServiceDurationYears;
    }

    public void setWorkerServiceDurationYears(String workerServiceDurationYears) {
        this.workerServiceDurationYears = workerServiceDurationYears;
    }

    public String getWorkerResponsibility() {
        return workerResponsibility;
    }

    public void setWorkerResponsibility(String workerResponsibility) {
        this.workerResponsibility = workerResponsibility;
    }

    public Integer getBeneficiaries0To6Months() {
        return beneficiaries0To6Months;
    }

    public void setBeneficiaries0To6Months(Integer beneficiaries0To6Months) {
        this.beneficiaries0To6Months = beneficiaries0To6Months;
    }

    public Integer getBeneficiariesTotal() {
        return beneficiariesTotal;
    }

    public void setBeneficiariesTotal(Integer beneficiariesTotal) {
        this.beneficiariesTotal = beneficiariesTotal;
    }

    public String getFoodSupply6Months3Years() {
        return foodSupply6Months3Years;
    }

    public void setFoodSupply6Months3Years(String foodSupply6Months3Years) {
        this.foodSupply6Months3Years = foodSupply6Months3Years;
    }

    public String getDrinkingWaterFacility() {
        return drinkingWaterFacility;
    }

    public void setDrinkingWaterFacility(String drinkingWaterFacility) {
        this.drinkingWaterFacility = drinkingWaterFacility;
    }

    public String getEducationalMaterialAvailable() {
        return educationalMaterialAvailable;
    }

    public void setEducationalMaterialAvailable(String educationalMaterialAvailable) {
        this.educationalMaterialAvailable = educationalMaterialAvailable;
    }

    public String getToyMaterialAvailable() {
        return toyMaterialAvailable;
    }

    public void setToyMaterialAvailable(String toyMaterialAvailable) {
        this.toyMaterialAvailable = toyMaterialAvailable;
    }

    public String getMedicalCheckupFacility() {
        return medicalCheckupFacility;
    }

    public void setMedicalCheckupFacility(String medicalCheckupFacility) {
        this.medicalCheckupFacility = medicalCheckupFacility;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
