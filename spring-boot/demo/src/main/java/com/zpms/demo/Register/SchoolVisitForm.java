package com.zpms.demo.Register; // Assuming this is your package

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "school_visit_info")
@Getter
@Setter
public class SchoolVisitForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 150) // Max length from Angular form
    private String schoolName;

    @NotNull
    private Integer approvedTeachers;

    @NotNull
    private Integer workingTeachers;

    @NotNull
    private Integer femaleCount;

    @NotNull
    private Integer maleCount;

    private Integer vacantTeachers; // Usually calculated, ensure DB allows null if not always set

    @NotNull
    private Integer presentteachers;

    @NotBlank
    @Pattern(regexp = "[^\\s]+(\\s[^\\s]+)*", message = "Invalid format for visited class")
    @Column(length = 50) // Max length from Angular form
    private String visitedClass;

    @NotBlank
    @Pattern(regexp = "[^\\s]+(\\s[^\\s]+)*", message = "Invalid format for grade")
    @Column(length = 20) // Max length from Angular form
    private String grade;

    // @NotBlank // Section can be optional according to Angular form (maxLength(10) but not required)
    // If section can be empty or null, remove @NotBlank
    @Pattern(regexp = "[^\\s]+(\\s[^\\s]+)*", message = "Invalid format for section")
    @Column(length = 10) // Max length from Angular form
    private String section;

    @NotNull
    private Integer boysCount;

    @NotNull
    private Integer girlsCount;

    private Integer totalCount;

    @Column(length = 10) // e.g., "100.00" or "75.50%"
    private String attendancePercentage;

    @NotNull
    private Integer boysPresent;

    @NotNull
    private Integer girlsPresent;

    private Integer totalPresent;

    @Column(length = 10)
    private String attendancePercentagePresent;

    private Integer boysAbsent;

    private Integer girlsAbsent;

    private Integer totalAbsent;

    @Column(length = 10)
    private String attendancePercentageAbsent;

    @ElementCollection
    @CollectionTable(name = "school_visit_facilities",
            joinColumns = @JoinColumn(name = "school_visit_id"))
    @MapKeyColumn(name = "facility_name", length = 100) // Define length for facility_name
    @Column(name = "facility_value", length = 10) // Assuming value is 'true' or similar short string
    @NotEmpty(message = "At least one facility must be marked")
    private Map<String, String> facilities = new HashMap<>();


    @NotBlank
    @Lob // Use @Lob for potentially very long text. This typically maps to TEXT/CLOB.
    // OR @Column(columnDefinition = "TEXT") for MySQL/PostgreSQL if you prefer explicit
    // OR @Column(length = 1000) if you are ABSOLUTELY SURE it will never exceed this AND your DB supports VARCHAR(1000)
    private String readingFeedback;

    @NotBlank
    @Lob
    private String writingFeedback;

    @NotBlank
    @Lob
    private String mathFeedback;

    @NotBlank
    @Column(length = 2000) // Max length from Angular form. Consider @Lob if it can be even larger.
    private String remark;


    // For Base64 Image Data - STRONGLY recommend storing as file path, not directly in DB
    // If you MUST store Base64 in DB, use @Lob. This will map to LONGTEXT/BLOB etc.
    @NotBlank(message = "Photo 1 is required")
    @Lob
    private String capturedImageData1;

    @NotNull(message = "Latitude for photo 1 is required")
    private Double latitude1;

    @NotNull(message = "Longitude for photo 1 is required")
    private Double longitude1;

    @Column(length = 255) // Filenames are usually within this
    private String existingImageFilename1;


    @Lob // Assuming these can also contain long Base64 strings
    private String capturedImageData2;
    private Double latitude2;
    private Double longitude2;
    @Column(length = 255)
    private String existingImageFilename2;

    @Lob
    private String capturedImageData3;
    private Double latitude3;
    private Double longitude3;
    @Column(length = 255)
    private String existingImageFilename3;

    @Lob
    private String capturedImageData4;
    private Double latitude4;
    private Double longitude4;
    @Column(length = 255)
    private String existingImageFilename4;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public Integer getApprovedTeachers() {
        return approvedTeachers;
    }

    public void setApprovedTeachers(Integer approvedTeachers) {
        this.approvedTeachers = approvedTeachers;
    }

    public Integer getWorkingTeachers() {
        return workingTeachers;
    }

    public void setWorkingTeachers(Integer workingTeachers) {
        this.workingTeachers = workingTeachers;
    }

    public Integer getFemaleCount() {
        return femaleCount;
    }

    public void setFemaleCount(Integer femaleCount) {
        this.femaleCount = femaleCount;
    }

    public Integer getMaleCount() {
        return maleCount;
    }

    public void setMaleCount(Integer maleCount) {
        this.maleCount = maleCount;
    }

    public Integer getVacantTeachers() {
        return vacantTeachers;
    }

    public void setVacantTeachers(Integer vacantTeachers) {
        this.vacantTeachers = vacantTeachers;
    }

    public Integer getPresentteachers() {
        return presentteachers;
    }

    public void setPresentteachers(Integer presentteachers) {
        this.presentteachers = presentteachers;
    }

    public String getVisitedClass() {
        return visitedClass;
    }

    public void setVisitedClass(String visitedClass) {
        this.visitedClass = visitedClass;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public Integer getBoysCount() {
        return boysCount;
    }

    public void setBoysCount(Integer boysCount) {
        this.boysCount = boysCount;
    }

    public Integer getGirlsCount() {
        return girlsCount;
    }

    public void setGirlsCount(Integer girlsCount) {
        this.girlsCount = girlsCount;
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }

    public String getAttendancePercentage() {
        return attendancePercentage;
    }

    public void setAttendancePercentage(String attendancePercentage) {
        this.attendancePercentage = attendancePercentage;
    }

    public Integer getBoysPresent() {
        return boysPresent;
    }

    public void setBoysPresent(Integer boysPresent) {
        this.boysPresent = boysPresent;
    }

    public Integer getGirlsPresent() {
        return girlsPresent;
    }

    public void setGirlsPresent(Integer girlsPresent) {
        this.girlsPresent = girlsPresent;
    }

    public Integer getTotalPresent() {
        return totalPresent;
    }

    public void setTotalPresent(Integer totalPresent) {
        this.totalPresent = totalPresent;
    }

    public String getAttendancePercentagePresent() {
        return attendancePercentagePresent;
    }

    public void setAttendancePercentagePresent(String attendancePercentagePresent) {
        this.attendancePercentagePresent = attendancePercentagePresent;
    }

    public Integer getBoysAbsent() {
        return boysAbsent;
    }

    public void setBoysAbsent(Integer boysAbsent) {
        this.boysAbsent = boysAbsent;
    }

    public Integer getGirlsAbsent() {
        return girlsAbsent;
    }

    public void setGirlsAbsent(Integer girlsAbsent) {
        this.girlsAbsent = girlsAbsent;
    }

    public Integer getTotalAbsent() {
        return totalAbsent;
    }

    public void setTotalAbsent(Integer totalAbsent) {
        this.totalAbsent = totalAbsent;
    }

    public String getAttendancePercentageAbsent() {
        return attendancePercentageAbsent;
    }

    public void setAttendancePercentageAbsent(String attendancePercentageAbsent) {
        this.attendancePercentageAbsent = attendancePercentageAbsent;
    }

    public Map<String, String> getFacilities() {
        return facilities;
    }

    public void setFacilities(Map<String, String> facilities) {
        this.facilities = facilities;
    }

    public String getReadingFeedback() {
        return readingFeedback;
    }

    public void setReadingFeedback(String readingFeedback) {
        this.readingFeedback = readingFeedback;
    }

    public String getWritingFeedback() {
        return writingFeedback;
    }

    public void setWritingFeedback(String writingFeedback) {
        this.writingFeedback = writingFeedback;
    }

    public String getMathFeedback() {
        return mathFeedback;
    }

    public void setMathFeedback(String mathFeedback) {
        this.mathFeedback = mathFeedback;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getCapturedImageData1() {
        return capturedImageData1;
    }

    public void setCapturedImageData1(String capturedImageData1) {
        this.capturedImageData1 = capturedImageData1;
    }

    public Double getLatitude1() {
        return latitude1;
    }

    public void setLatitude1(Double latitude1) {
        this.latitude1 = latitude1;
    }

    public Double getLongitude1() {
        return longitude1;
    }

    public void setLongitude1(Double longitude1) {
        this.longitude1 = longitude1;
    }

    public String getExistingImageFilename1() {
        return existingImageFilename1;
    }

    public void setExistingImageFilename1(String existingImageFilename1) {
        this.existingImageFilename1 = existingImageFilename1;
    }

    public String getCapturedImageData2() {
        return capturedImageData2;
    }

    public void setCapturedImageData2(String capturedImageData2) {
        this.capturedImageData2 = capturedImageData2;
    }

    public Double getLatitude2() {
        return latitude2;
    }

    public void setLatitude2(Double latitude2) {
        this.latitude2 = latitude2;
    }

    public Double getLongitude2() {
        return longitude2;
    }

    public void setLongitude2(Double longitude2) {
        this.longitude2 = longitude2;
    }

    public String getExistingImageFilename2() {
        return existingImageFilename2;
    }

    public void setExistingImageFilename2(String existingImageFilename2) {
        this.existingImageFilename2 = existingImageFilename2;
    }

    public String getCapturedImageData3() {
        return capturedImageData3;
    }

    public void setCapturedImageData3(String capturedImageData3) {
        this.capturedImageData3 = capturedImageData3;
    }

    public Double getLatitude3() {
        return latitude3;
    }

    public void setLatitude3(Double latitude3) {
        this.latitude3 = latitude3;
    }

    public Double getLongitude3() {
        return longitude3;
    }

    public void setLongitude3(Double longitude3) {
        this.longitude3 = longitude3;
    }

    public String getExistingImageFilename3() {
        return existingImageFilename3;
    }

    public void setExistingImageFilename3(String existingImageFilename3) {
        this.existingImageFilename3 = existingImageFilename3;
    }

    public String getCapturedImageData4() {
        return capturedImageData4;
    }

    public void setCapturedImageData4(String capturedImageData4) {
        this.capturedImageData4 = capturedImageData4;
    }

    public Double getLatitude4() {
        return latitude4;
    }

    public void setLatitude4(Double latitude4) {
        this.latitude4 = latitude4;
    }

    public Double getLongitude4() {
        return longitude4;
    }

    public void setLongitude4(Double longitude4) {
        this.longitude4 = longitude4;
    }

    public String getExistingImageFilename4() {
        return existingImageFilename4;
    }

    public void setExistingImageFilename4(String existingImageFilename4) {
        this.existingImageFilename4 = existingImageFilename4;
    }
}
