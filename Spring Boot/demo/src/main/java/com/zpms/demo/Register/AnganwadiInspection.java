package com.zpms.demo.Register;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name="anganwadi_inspection")
@Data
public class AnganwadiInspection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "anganwadi_number")
    private String anganwadiNumber;

    private String taluka;

    @Column(name = "inspection_date")
    private LocalDate inspectionDate;

    @Column(name = "village_name")
    private String villageName;

    @Column(name = "worker_name")
    private String workerName;

    @Column(name = "anganwadi_helper_name")
    private String anganwadiHelperName;

    @Column(name = "worker_helper_present")
    private String workerHelperPresent;

    @Column(name = "center_surroundings_clean")
    private String centerSurroundingsClean;

    @Column(name = "building_type")
    private String buildingType;

    @Column(name = "center_category")
    private String centerCategory;

    @Column(name = "toilet_available")
    private String toiletAvailable;

    @Column(name = "toilet_usage")
    private String toiletUsage;

    @Column(name = "electricity_supply")
    private String electricitySupply;

    @Column(name = "drinking_water_supply")
    private String drinkingWaterSupply;

    @NotNull(message = "Total enrollment is required")
    @Min(value = 0, message = "Total enrollment cannot be negative")
    @Column(name = "total_enrollment")
    private Integer totalEnrollment;

    @NotNull(message = "Present children count is required")
    @Min(value = 0, message = "Present children count cannot be negative")
    @Column(name = "children_present")
    private Integer childrenPresent;

    @NotNull(message = "Weighed children count is required")
    @Min(value = 0, message = "Weighed children count cannot be negative")
    @Column(name = "children_weight_measured")
    private Integer childrenWeightMeasured;

    @NotNull(message = "Normal weight children count is required")
    @Min(value = 0, message = "Normal weight children count cannot be negative")
    @Column(name = "normal_weight_children")
    private Integer normalWeightChildren;

    @NotNull(message = "SUW children count is required")
    @Min(value = 0, message = "SUW children count cannot be negative")
    @Column(name = "suw_children") // This field maps to 'suw_children' column
    private Integer suwChildren;

    @NotNull(message = "MUW children count is required")
    @Min(value = 0, message = "MUW children count cannot be negative")
    @Column(name = "muw_children") // This field maps to 'muw_children' column
    private Integer muwChildren;

    @NotNull(message = "SAM children count is required")
    @Min(value = 0, message = "SAM children count cannot be negative")
    @Column(name = "sam_children")
    private Integer samChildren;

    @NotNull(message = "MAM children count is required")
    @Min(value = 0, message = "MAM children count cannot be negative")
    @Column(name = "mam_children")
    private Integer mamChildren;

    @Column(name = "breakfast_meal")
    private String breakfastMeal;

    @Column(name = "taste_quality", columnDefinition = "TEXT")
    private String tasteQuality;

    @Column(name = "campaigns_details", columnDefinition = "TEXT")
    private String campaignsDetails;

    @Column(name = "anganwadi_feedback_suggestions", columnDefinition = "TEXT")
    private String anganwadiFeedbackSuggestions;

    @Column(name = "shera", columnDefinition = "TEXT")
    private String shera;

    @Transient
    private String anganwadiName;

    @Column(name = "image_filename_1")
    private String imageFilename1;
    @Column(name = "latitude_1")
    private Double latitude1;
    @Column(name = "longitude_1")
    private Double longitude1;

    @Column(name = "image_filename_2")
    private String imageFilename2;
    @Column(name = "latitude_2")
    private Double latitude2;
    @Column(name = "longitude_2")
    private Double longitude2;

    @Column(name = "image_filename_3")
    private String imageFilename3;
    @Column(name = "latitude_3")
    private Double latitude3;
    @Column(name = "longitude_3")
    private Double longitude3;

    @Column(name = "image_filename_4")
    private String imageFilename4;
    @Column(name = "latitude_4")
    private Double latitude4;
    @Column(name = "longitude_4")
    private Double longitude4;

    @Column(name = "status")
    private String status;
}