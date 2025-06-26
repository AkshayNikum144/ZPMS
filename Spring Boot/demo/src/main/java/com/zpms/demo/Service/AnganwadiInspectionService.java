package com.zpms.demo.Service;

import com.zpms.demo.Register.AnganwadiInspection;
import com.zpms.demo.Repository.AnganwadiInspectionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import jakarta.persistence.EntityNotFoundException; // Standard JPA exception
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnganwadiInspectionService {

    private static final Logger logger = LoggerFactory.getLogger(AnganwadiInspectionService.class);

    private final AnganwadiInspectionRepository inspectionRepository;
    private final Path fileStorageLocation;

    @Autowired
    public AnganwadiInspectionService(AnganwadiInspectionRepository inspectionRepository,
                                      @Value("${file.upload-dir:./uploads/anganwadi-photos}") String uploadDir) {
        this.inspectionRepository = inspectionRepository;
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
            logger.info("Upload directory created/verified: {}", this.fileStorageLocation);
        } catch (Exception ex) {
            logger.error("Could not create the directory for uploads: {}", this.fileStorageLocation, ex);
            // Consider if this should be a fatal error for the application startup
            throw new RuntimeException("Could not initialize storage directory: " + this.fileStorageLocation.toString(), ex);
        }
    }

    private String storeFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }
        String originalFileName = StringUtils.cleanPath(Optional.ofNullable(file.getOriginalFilename()).orElse("unknownfile"));
        String fileExtension = "";
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < originalFileName.length() - 1) {
            fileExtension = originalFileName.substring(dotIndex);
        }
        // Ensure filename is unique and valid for file systems
        String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName.replaceAll("[^a-zA-Z0-9.\\-]", "_") + fileExtension;
        uniqueFileName = uniqueFileName.substring(0, Math.min(uniqueFileName.length(), 250)); // Limit filename length

        Path targetLocation = this.fileStorageLocation.resolve(uniqueFileName);
        try {
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            logger.info("Saved photo to: {}", targetLocation);
            return uniqueFileName;
        } catch (IOException ex) {
            logger.error("Could not store file {}. Error: {}", originalFileName, ex.getMessage(), ex);
            throw new IOException("Could not store file " + originalFileName + ". Please try again!", ex);
        }
    }


    @Transactional
    public AnganwadiInspection saveInspection(AnganwadiInspection inspection, MultipartFile[] photos) throws IOException {
        logger.info("Saving inspection for Anganwadi Number: {}", inspection.getAnganwadiNumber());

        if (inspection.getAnganwadiNumber() == null || inspection.getAnganwadiNumber().isBlank()) {
            throw new IllegalArgumentException("Anganwadi number cannot be null or empty.");
        }
        // Add other critical field validations as needed before proceeding


        if (photos != null) {
            logger.info("Processing {} photos.", photos.length);
            for (int i = 0; i < photos.length && i < 4; i++) { // Limit to 4 photos
                MultipartFile photo = photos[i];
                if (photo != null && !photo.isEmpty()) {
                    String storedFileName = storeFile(photo);
                    switch (i) {
                        case 0: inspection.setImageFilename1(storedFileName); break;
                        case 1: inspection.setImageFilename2(storedFileName); break;
                        case 2: inspection.setImageFilename3(storedFileName); break;
                        case 3: inspection.setImageFilename4(storedFileName); break;
                    }
                } else {
                    logger.debug("Photo at index {} is null or empty.", i);
                }
            }
        } else {
            logger.debug("Photos array is null or not provided.");
        }

        if (inspection.getStatus() == null || inspection.getStatus().isBlank()) {
            inspection.setStatus("Submitted"); // Default status
        }

        try {
            AnganwadiInspection savedInspection = inspectionRepository.save(inspection);
            logger.info("Inspection saved successfully with ID: {}", savedInspection.getId());
            return savedInspection;
        } catch (Exception e) { // Catch specific JPA or DataIntegrityViolationException if possible
            logger.error("Error saving inspection to database: {}", e.getMessage(), e);
            // Clean up stored files if DB save fails? This can be complex.
            // For now, rethrow as a runtime exception or a custom service exception.
            throw new RuntimeException("Failed to save inspection data after processing files.", e);
        }
    }

    public List<AnganwadiInspection> getAllInspections() {
        logger.info("Fetching all inspections.");
        return inspectionRepository.findAll();
    }

    public Optional<AnganwadiInspection> getInspectionById(Long id) {
        logger.info("Fetching inspection by ID: {}", id);
        return inspectionRepository.findById(id);
    }

    @Transactional
    public AnganwadiInspection updateInspection(Long id, AnganwadiInspection updatedInspectionData, MultipartFile[] photos) throws IOException {
        logger.info("Attempting to update inspection with ID: {}", id);
        AnganwadiInspection existingInspection = inspectionRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Inspection not found with id: " + id));

        // Update textual data
        existingInspection.setAnganwadiNumber(updatedInspectionData.getAnganwadiNumber());
        existingInspection.setTaluka(updatedInspectionData.getTaluka());
        existingInspection.setVillageName(updatedInspectionData.getVillageName());
        existingInspection.setWorkerName(updatedInspectionData.getWorkerName());
        existingInspection.setInspectionDate(updatedInspectionData.getInspectionDate());
        existingInspection.setAnganwadiHelperName(updatedInspectionData.getAnganwadiHelperName());
        existingInspection.setWorkerHelperPresent(updatedInspectionData.getWorkerHelperPresent());
        existingInspection.setCenterSurroundingsClean(updatedInspectionData.getCenterSurroundingsClean());
        existingInspection.setBuildingType(updatedInspectionData.getBuildingType());
        existingInspection.setCenterCategory(updatedInspectionData.getCenterCategory());
        existingInspection.setToiletAvailable(updatedInspectionData.getToiletAvailable());
        existingInspection.setToiletUsage(updatedInspectionData.getToiletUsage());
        existingInspection.setElectricitySupply(updatedInspectionData.getElectricitySupply());
        existingInspection.setDrinkingWaterSupply(updatedInspectionData.getDrinkingWaterSupply());
        existingInspection.setTotalEnrollment(updatedInspectionData.getTotalEnrollment());
        existingInspection.setChildrenPresent(updatedInspectionData.getChildrenPresent());
        existingInspection.setChildrenWeightMeasured(updatedInspectionData.getChildrenWeightMeasured());
        existingInspection.setNormalWeightChildren(updatedInspectionData.getNormalWeightChildren());
        existingInspection.setSuwChildren(updatedInspectionData.getSuwChildren());
        existingInspection.setMuwChildren(updatedInspectionData.getMuwChildren());
        existingInspection.setSamChildren(updatedInspectionData.getSamChildren());
        existingInspection.setMamChildren(updatedInspectionData.getMamChildren());
        existingInspection.setBreakfastMeal(updatedInspectionData.getBreakfastMeal());
        existingInspection.setTasteQuality(updatedInspectionData.getTasteQuality());
        existingInspection.setCampaignsDetails(updatedInspectionData.getCampaignsDetails());
        existingInspection.setAnganwadiFeedbackSuggestions(updatedInspectionData.getAnganwadiFeedbackSuggestions());
        existingInspection.setShera(updatedInspectionData.getShera());
        existingInspection.setStatus(updatedInspectionData.getStatus());

        // Handle photo updates (this example replaces photos if new ones are provided)
        if (photos != null) {
            for (int i = 0; i < photos.length && i < 4; i++) {
                MultipartFile photo = photos[i];
                if (photo != null && !photo.isEmpty()) {
                    String newFileName = storeFile(photo);
                    // Delete old file before setting new one
                    switch (i) {
                        case 0: deletePhotoFile(existingInspection.getImageFilename1()); existingInspection.setImageFilename1(newFileName); break;
                        case 1: deletePhotoFile(existingInspection.getImageFilename2()); existingInspection.setImageFilename2(newFileName); break;
                        case 2: deletePhotoFile(existingInspection.getImageFilename3()); existingInspection.setImageFilename3(newFileName); break;
                        case 3: deletePhotoFile(existingInspection.getImageFilename4()); existingInspection.setImageFilename4(newFileName); break;
                    }
                }
            }
        }
        // Update latitude/longitude if provided
        existingInspection.setLatitude1(updatedInspectionData.getLatitude1());
        existingInspection.setLongitude1(updatedInspectionData.getLongitude1());
        // ... for other coordinates

        AnganwadiInspection updated = inspectionRepository.save(existingInspection);
        logger.info("Inspection updated successfully with ID: {}", updated.getId());
        return updated;
    }


    @Transactional
    public void deleteInspection(Long id) {
        logger.info("Attempting to delete inspection with ID: {}", id);
        inspectionRepository.findById(id).ifPresentOrElse(inspection -> {
            // Delete associated photos from file system
            deletePhotoFile(inspection.getImageFilename1());
            deletePhotoFile(inspection.getImageFilename2());
            deletePhotoFile(inspection.getImageFilename3());
            deletePhotoFile(inspection.getImageFilename4());
            
            inspectionRepository.deleteById(id);
            logger.info("Successfully deleted inspection with ID: {}", id);
        }, () -> {
            logger.warn("Deletion failed. Inspection not found with id: {}", id);
            throw new EntityNotFoundException("Inspection not found with id: " + id + " for deletion.");
        });
    }

    private void deletePhotoFile(String filename) {
        if (filename != null && !filename.isEmpty()) {
            try {
                Path filePath = this.fileStorageLocation.resolve(filename).normalize();
                Files.deleteIfExists(filePath);
                logger.info("Deleted photo file: {}", filePath);
            } catch (IOException e) {
                // Log error but don't let it fail the whole delete operation usually
                logger.error("Could not delete photo file: {}. Error: {}", filename, e.getMessage(), e);
            }
        }
    }
}