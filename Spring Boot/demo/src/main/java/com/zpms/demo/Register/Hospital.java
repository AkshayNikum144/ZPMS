package com.zpms.demo.Register;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "new_hospital")
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "PHC name is required")
    @Size(max = 100, message = "PHC name must not exceed 100 characters")
    private String phcName;

    @NotBlank(message = "Subcenter name is required")
    @Size(max = 100, message = "Subcenter name must not exceed 100 characters")
    private String subcenterName;

    @NotBlank(message = "Village PHC ID is required")
    @Size(max = 50, message = "Village PHC ID must not exceed 50 characters")
    private String villagePhcId;

    @NotBlank(message = "Month name is required")
    @Size(max = 20, message = "Month name must not exceed 20 characters")
    private String monthName;

    @NotNull(message = "Cataract suspected total is required")
    @Min(value = 0, message = "Cataract suspected total must be non-negative")
    private Integer cataractSuspectedTotal;

    @NotNull(message = "Cataract screened total is required")
    @Min(value = 0, message = "Cataract screened total must be non-negative")
    private Integer cataractScreenedTotal;

    @NotNull(message = "Cataract mature cases is required")
    @Min(value = 0, message = "Cataract mature cases must be non-negative")
    private Integer cataractMatureCases;

    @NotNull(message = "Cataract immature cases is required")
    @Min(value = 0, message = "Cataract immature cases must be non-negative")
    private Integer cataractImmatureCases;

    @NotNull(message = "Cataract surgery done is required")
    @Min(value = 0, message = "Cataract surgery done must be non-negative")
    private Integer cataractSurgeryDone;

    @NotNull(message = "Cataract followup total is required")
    @Min(value = 0, message = "Cataract followup total must be non-negative")
    private Integer cataractFollowupTotal;

    @NotNull(message = "HTN suspected total is required")
    @Min(value = 0, message = "HTN suspected total must be non-negative")
    private Integer htnSuspectedTotal;

    @NotNull(message = "HTN referred total is required")
    @Min(value = 0, message = "HTN referred total must be non-negative")
    private Integer htnReferredTotal;

    @NotNull(message = "HTN on treatment total is required")
    @Min(value = 0, message = "HTN on treatment total must be non-negative")
    private Integer htnOnTreatmentTotal;

    @NotNull(message = "HTN on counseling not on treatment is required")
    @Min(value = 0, message = "HTN on counseling not on treatment must be non-negative")
    private Integer htnOnCounselingNotOnTreatment;

    @NotNull(message = "HTN treatment and followup is required")
    @Min(value = 0, message = "HTN treatment and followup must be non-negative")
    private Integer htnTreatmentAndFollowup;

    @NotNull(message = "DM suspected total is required")
    @Min(value = 0, message = "DM suspected total must be non-negative")
    private Integer dmSuspectedTotal;

    @NotNull(message = "DM referred total is required")
    @Min(value = 0, message = "DM referred total must be non-negative")
    private Integer dmReferredTotal;

    @NotNull(message = "DM on treatment total is required")
    @Min(value = 0, message = "DM on treatment total must be non-negative")
    private Integer dmOnTreatmentTotal;

    @NotNull(message = "DM on counseling not on treatment is required")
    @Min(value = 0, message = "DM on counseling not on treatment must be non-negative")
    private Integer dmOnCounselingNotOnTreatment;

    @NotNull(message = "DM treatment followup is required")
    @Min(value = 0, message = "DM treatment followup must be non-negative")
    private Integer dmTreatmentFollowup;

    @NotNull(message = "TB suspected total is required")
    @Min(value = 0, message = "TB suspected total must be non-negative")
    private Integer tbSuspectedTotal;

    @NotNull(message = "TB referred for X-ray total is required")
    @Min(value = 0, message = "TB referred for X-ray total must be non-negative")
    private Integer tbReferredForXrayTotal;

    @NotNull(message = "TB sputum collected total is required")
    @Min(value = 0, message = "TB sputum collected total must be non-negative")
    private Integer tbSputumCollectedTotal;

    @NotNull(message = "TB diagnosed total is required")
    @Min(value = 0, message = "TB diagnosed total must be non-negative")
    private Integer tbDiagnosedTotal;

    @NotNull(message = "TB on treatment total is required")
    @Min(value = 0, message = "TB on treatment total must be non-negative")
    private Integer tbOnTreatmentTotal;

    @NotNull(message = "Leprosy suspected total is required")
    @Min(value = 0, message = "Leprosy suspected total must be non-negative")
    private Integer leprosySuspectedTotal;

    @NotNull(message = "Leprosy referred total is required")
    @Min(value = 0, message = "Leprosy referred total must be non-negative")
    private Integer leprosyReferredTotal;

    @NotNull(message = "Leprosy diagnosed total is required")
    @Min(value = 0, message = "Leprosy diagnosed total must be non-negative")
    private Integer leprosyDiagnosedTotal;

    @NotNull(message = "Leprosy on treatment total is required")
    @Min(value = 0, message = "Leprosy on treatment total must be non-negative")
    private Integer leprosyOnTreatmentTotal;

    @NotNull(message = "Leprosy reconstructive surgery total is required")
    @Min(value = 0, message = "Leprosy reconstructive surgery total must be non-negative")
    private Integer leprosyReconstructiveSurgeryTotal;

    @NotNull(message = "Oral cancer suspected total is required")
    @Min(value = 0, message = "Oral cancer suspected total must be non-negative")
    private Integer oralCancerSuspectedTotal;

    @NotNull(message = "Oral cancer referred total is required")
    @Min(value = 0, message = "Oral cancer referred total must be non-negative")
    private Integer oralCancerReferredTotal;

    @NotNull(message = "Oral cancer diagnosed total is required")
    @Min(value = 0, message = "Oral cancer diagnosed total must be non-negative")
    private Integer oralCancerDiagnosedTotal;

    @NotNull(message = "Oral cancer chemotherapy is required")
    @Min(value = 0, message = "Oral cancer chemotherapy must be non-negative")
    private Integer oralCancerChemoTherapy;

    @NotNull(message = "Oral cancer surgery done is required")
    @Min(value = 0, message = "Oral cancer surgery done must be non-negative")
    private Integer oralCancerSurgeryDone;

    @NotNull(message = "Breast cancer suspected total is required")
    @Min(value = 0, message = "Breast cancer suspected total must be non-negative")
    private Integer breastCancerSuspectedTotal;

    @NotNull(message = "Breast cancer referred total is required")
    @Min(value = 0, message = "Breast cancer referred total must be non-negative")
    private Integer breastCancerReferredTotal;

    @NotNull(message = "Breast cancer diagnosed total is required")
    @Min(value = 0, message = "Breast cancer diagnosed total must be non-negative")
    private Integer breastCancerDiagnosedTotal;

    @NotNull(message = "Breast cancer chemotherapy is required")
    @Min(value = 0, message = "Breast cancer chemotherapy must be non-negative")
    private Integer breastCancerChemoTherapy;

    @NotNull(message = "Breast cancer surgery done is required")
    @Min(value = 0, message = "Breast cancer surgery done must be non-negative")
    private Integer breastCancerSurgeryDone;

    @NotNull(message = "Cervical cancer suspected total is required")
    @Min(value = 0, message = "Cervical cancer suspected total must be non-negative")
    private Integer cervicalCancerSuspectedTotal;

    @NotNull(message = "Cervical cancer referred total is required")
    @Min(value = 0, message = "Cervical cancer referred total must be non-negative")
    private Integer cervicalCancerReferredTotal;

    @NotNull(message = "Cervical cancer diagnosed total is required")
    @Min(value = 0, message = "Cervical cancer diagnosed total must be non-negative")
    private Integer cervicalCancerDiagnosedTotal;

    @NotNull(message = "Cervical cancer chemotherapy is required")
    @Min(value = 0, message = "Cervical cancer chemotherapy must be non-negative")
    private Integer cervicalCancerChemoTherapy;

    @NotNull(message = "Cervical cancer surgery done is required")
    @Min(value = 0, message = "Cervical cancer surgery done must be non-negative")
    private Integer cervicalCancerSurgeryDone;

    @NotNull(message = "HPLC samples sent total is required")
    @Min(value = 0, message = "HPLC samples sent total must be non-negative")
    private Integer hplcSamplesSentTotal;

    @NotNull(message = "HPLC AS carrier count is required")
    @Min(value = 0, message = "HPLC AS carrier count must be non-negative")
    private Integer hplcAsCarrierCount;

    @NotNull(message = "HPLC SS carrier count is required")
    @Min(value = 0, message = "HPLC SS carrier count must be non-negative")
    private Integer hplcSsCarrierCount;

    public Hospital() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhcName() {
        return phcName;
    }

    public void setPhcName(String phcName) {
        this.phcName = phcName;
    }

    public String getSubcenterName() {
        return subcenterName;
    }

    public void setSubcenterName(String subcenterName) {
        this.subcenterName = subcenterName;
    }

    public String getVillagePhcId() {
        return villagePhcId;
    }

    public void setVillagePhcId(String villagePhcId) {
        this.villagePhcId = villagePhcId;
    }

    public String getMonthName() {
        return monthName;
    }

    public void setMonthName(String monthName) {
        this.monthName = monthName;
    }

    public Integer getCataractSuspectedTotal() {
        return cataractSuspectedTotal;
    }

    public void setCataractSuspectedTotal(Integer cataractSuspectedTotal) {
        this.cataractSuspectedTotal = cataractSuspectedTotal;
    }

    public Integer getCataractScreenedTotal() {
        return cataractScreenedTotal;
    }

    public void setCataractScreenedTotal(Integer cataractScreenedTotal) {
        this.cataractScreenedTotal = cataractScreenedTotal;
    }

    public Integer getCataractMatureCases() {
        return cataractMatureCases;
    }

    public void setCataractMatureCases(Integer cataractMatureCases) {
        this.cataractMatureCases = cataractMatureCases;
    }

    public Integer getCataractImmatureCases() {
        return cataractImmatureCases;
    }

    public void setCataractImmatureCases(Integer cataractImmatureCases) {
        this.cataractImmatureCases = cataractImmatureCases;
    }

    public Integer getCataractSurgeryDone() {
        return cataractSurgeryDone;
    }

    public void setCataractSurgeryDone(Integer cataractSurgeryDone) {
        this.cataractSurgeryDone = cataractSurgeryDone;
    }

    public Integer getCataractFollowupTotal() {
        return cataractFollowupTotal;
    }

    public void setCataractFollowupTotal(Integer cataractFollowupTotal) {
        this.cataractFollowupTotal = cataractFollowupTotal;
    }

    public Integer getHtnSuspectedTotal() {
        return htnSuspectedTotal;
    }

    public void setHtnSuspectedTotal(Integer htnSuspectedTotal) {
        this.htnSuspectedTotal = htnSuspectedTotal;
    }

    public Integer getHtnReferredTotal() {
        return htnReferredTotal;
    }

    public void setHtnReferredTotal(Integer htnReferredTotal) {
        this.htnReferredTotal = htnReferredTotal;
    }

    public Integer getHtnOnTreatmentTotal() {
        return htnOnTreatmentTotal;
    }

    public void setHtnOnTreatmentTotal(Integer htnOnTreatmentTotal) {
        this.htnOnTreatmentTotal = htnOnTreatmentTotal;
    }

    public Integer getHtnOnCounselingNotOnTreatment() {
        return htnOnCounselingNotOnTreatment;
    }

    public void setHtnOnCounselingNotOnTreatment(Integer htnOnCounselingNotOnTreatment) {
        this.htnOnCounselingNotOnTreatment = htnOnCounselingNotOnTreatment;
    }

    public Integer getHtnTreatmentAndFollowup() {
        return htnTreatmentAndFollowup;
    }

    public void setHtnTreatmentAndFollowup(Integer htnTreatmentAndFollowup) {
        this.htnTreatmentAndFollowup = htnTreatmentAndFollowup;
    }

    public Integer getDmSuspectedTotal() {
        return dmSuspectedTotal;
    }

    public void setDmSuspectedTotal(Integer dmSuspectedTotal) {
        this.dmSuspectedTotal = dmSuspectedTotal;
    }

    public Integer getDmReferredTotal() {
        return dmReferredTotal;
    }

    public void setDmReferredTotal(Integer dmReferredTotal) {
        this.dmReferredTotal = dmReferredTotal;
    }

    public Integer getDmOnTreatmentTotal() {
        return dmOnTreatmentTotal;
    }

    public void setDmOnTreatmentTotal(Integer dmOnTreatmentTotal) {
        this.dmOnTreatmentTotal = dmOnTreatmentTotal;
    }

    public Integer getDmOnCounselingNotOnTreatment() {
        return dmOnCounselingNotOnTreatment;
    }

    public void setDmOnCounselingNotOnTreatment(Integer dmOnCounselingNotOnTreatment) {
        this.dmOnCounselingNotOnTreatment = dmOnCounselingNotOnTreatment;
    }

    public Integer getDmTreatmentFollowup() {
        return dmTreatmentFollowup;
    }

    public void setDmTreatmentFollowup(Integer dmTreatmentFollowup) {
        this.dmTreatmentFollowup = dmTreatmentFollowup;
    }

    public Integer getTbSuspectedTotal() {
        return tbSuspectedTotal;
    }

    public void setTbSuspectedTotal(Integer tbSuspectedTotal) {
        this.tbSuspectedTotal = tbSuspectedTotal;
    }

    public Integer getTbReferredForXrayTotal() {
        return tbReferredForXrayTotal;
    }

    public void setTbReferredForXrayTotal(Integer tbReferredForXrayTotal) {
        this.tbReferredForXrayTotal = tbReferredForXrayTotal;
    }

    public Integer getTbSputumCollectedTotal() {
        return tbSputumCollectedTotal;
    }

    public void setTbSputumCollectedTotal(Integer tbSputumCollectedTotal) {
        this.tbSputumCollectedTotal = tbSputumCollectedTotal;
    }

    public Integer getTbDiagnosedTotal() {
        return tbDiagnosedTotal;
    }

    public void setTbDiagnosedTotal(Integer tbDiagnosedTotal) {
        this.tbDiagnosedTotal = tbDiagnosedTotal;
    }

    public Integer getTbOnTreatmentTotal() {
        return tbOnTreatmentTotal;
    }

    public void setTbOnTreatmentTotal(Integer tbOnTreatmentTotal) {
        this.tbOnTreatmentTotal = tbOnTreatmentTotal;
    }

    public Integer getLeprosySuspectedTotal() {
        return leprosySuspectedTotal;
    }

    public void setLeprosySuspectedTotal(Integer leprosySuspectedTotal) {
        this.leprosySuspectedTotal = leprosySuspectedTotal;
    }

    public Integer getLeprosyReferredTotal() {
        return leprosyReferredTotal;
    }

    public void setLeprosyReferredTotal(Integer leprosyReferredTotal) {
        this.leprosyReferredTotal = leprosyReferredTotal;
    }

    public Integer getLeprosyDiagnosedTotal() {
        return leprosyDiagnosedTotal;
    }

    public void setLeprosyDiagnosedTotal(Integer leprosyDiagnosedTotal) {
        this.leprosyDiagnosedTotal = leprosyDiagnosedTotal;
    }

    public Integer getLeprosyOnTreatmentTotal() {
        return leprosyOnTreatmentTotal;
    }

    public void setLeprosyOnTreatmentTotal(Integer leprosyOnTreatmentTotal) {
        this.leprosyOnTreatmentTotal = leprosyOnTreatmentTotal;
    }

    public Integer getLeprosyReconstructiveSurgeryTotal() {
        return leprosyReconstructiveSurgeryTotal;
    }

    public void setLeprosyReconstructiveSurgeryTotal(Integer leprosyReconstructiveSurgeryTotal) {
        this.leprosyReconstructiveSurgeryTotal = leprosyReconstructiveSurgeryTotal;
    }

    public Integer getOralCancerSuspectedTotal() {
        return oralCancerSuspectedTotal;
    }

    public void setOralCancerSuspectedTotal(Integer oralCancerSuspectedTotal) {
        this.oralCancerSuspectedTotal = oralCancerSuspectedTotal;
    }

    public Integer getOralCancerReferredTotal() {
        return oralCancerReferredTotal;
    }

    public void setOralCancerReferredTotal(Integer oralCancerReferredTotal) {
        this.oralCancerReferredTotal = oralCancerReferredTotal;
    }

    public Integer getOralCancerDiagnosedTotal() {
        return oralCancerDiagnosedTotal;
    }

    public void setOralCancerDiagnosedTotal(Integer oralCancerDiagnosedTotal) {
        this.oralCancerDiagnosedTotal = oralCancerDiagnosedTotal;
    }

    public Integer getOralCancerChemoTherapy() {
        return oralCancerChemoTherapy;
    }

    public void setOralCancerChemoTherapy(Integer oralCancerChemoTherapy) {
        this.oralCancerChemoTherapy = oralCancerChemoTherapy;
    }

    public Integer getOralCancerSurgeryDone() {
        return oralCancerSurgeryDone;
    }

    public void setOralCancerSurgeryDone(Integer oralCancerSurgeryDone) {
        this.oralCancerSurgeryDone = oralCancerSurgeryDone;
    }

    public Integer getBreastCancerSuspectedTotal() {
        return breastCancerSuspectedTotal;
    }

    public void setBreastCancerSuspectedTotal(Integer breastCancerSuspectedTotal) {
        this.breastCancerSuspectedTotal = breastCancerSuspectedTotal;
    }

    public Integer getBreastCancerReferredTotal() {
        return breastCancerReferredTotal;
    }

    public void setBreastCancerReferredTotal(Integer breastCancerReferredTotal) {
        this.breastCancerReferredTotal = breastCancerReferredTotal;
    }

    public Integer getBreastCancerDiagnosedTotal() {
        return breastCancerDiagnosedTotal;
    }

    public void setBreastCancerDiagnosedTotal(Integer breastCancerDiagnosedTotal) {
        this.breastCancerDiagnosedTotal = breastCancerDiagnosedTotal;
    }

    public Integer getBreastCancerChemoTherapy() {
        return breastCancerChemoTherapy;
    }

    public void setBreastCancerChemoTherapy(Integer breastCancerChemoTherapy) {
        this.breastCancerChemoTherapy = breastCancerChemoTherapy;
    }

    public Integer getBreastCancerSurgeryDone() {
        return breastCancerSurgeryDone;
    }

    public void setBreastCancerSurgeryDone(Integer breastCancerSurgeryDone) {
        this.breastCancerSurgeryDone = breastCancerSurgeryDone;
    }

    public Integer getCervicalCancerSuspectedTotal() {
        return cervicalCancerSuspectedTotal;
    }

    public void setCervicalCancerSuspectedTotal(Integer cervicalCancerSuspectedTotal) {
        this.cervicalCancerSuspectedTotal = cervicalCancerSuspectedTotal;
    }

    public Integer getCervicalCancerReferredTotal() {
        return cervicalCancerReferredTotal;
    }

    public void setCervicalCancerReferredTotal(Integer cervicalCancerReferredTotal) {
        this.cervicalCancerReferredTotal = cervicalCancerReferredTotal;
    }

    public Integer getCervicalCancerDiagnosedTotal() {
        return cervicalCancerDiagnosedTotal;
    }

    public void setCervicalCancerDiagnosedTotal(Integer cervicalCancerDiagnosedTotal) {
        this.cervicalCancerDiagnosedTotal = cervicalCancerDiagnosedTotal;
    }

    public Integer getCervicalCancerChemoTherapy() {
        return cervicalCancerChemoTherapy;
    }

    public void setCervicalCancerChemoTherapy(Integer cervicalCancerChemoTherapy) {
        this.cervicalCancerChemoTherapy = cervicalCancerChemoTherapy;
    }

    public Integer getCervicalCancerSurgeryDone() {
        return cervicalCancerSurgeryDone;
    }

    public void setCervicalCancerSurgeryDone(Integer cervicalCancerSurgeryDone) {
        this.cervicalCancerSurgeryDone = cervicalCancerSurgeryDone;
    }

    public Integer getHplcSamplesSentTotal() {
        return hplcSamplesSentTotal;
    }

    public void setHplcSamplesSentTotal(Integer hplcSamplesSentTotal) {
        this.hplcSamplesSentTotal = hplcSamplesSentTotal;
    }

    public Integer getHplcAsCarrierCount() {
        return hplcAsCarrierCount;
    }

    public void setHplcAsCarrierCount(Integer hplcAsCarrierCount) {
        this.hplcAsCarrierCount = hplcAsCarrierCount;
    }

    public Integer getHplcSsCarrierCount() {
        return hplcSsCarrierCount;
    }

    public void setHplcSsCarrierCount(Integer hplcSsCarrierCount) {
        this.hplcSsCarrierCount = hplcSsCarrierCount;
    }
}