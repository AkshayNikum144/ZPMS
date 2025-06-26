package com.zpms.demo.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.Validator; // Import Spring Validator
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.zpms.demo.Register.AnganwadiInspection;
import com.zpms.demo.Service.AnganwadiInspectionService;
import jakarta.persistence.EntityNotFoundException; // Ensure this is imported if service throws it directly
import jakarta.validation.Valid; // JSR-303 validation for @RequestPart content

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/inspections")
@CrossOrigin(origins = "http://localhost:4200/")
public class AnganwadiInspectionController {

    private static final Logger logger = LoggerFactory.getLogger(AnganwadiInspectionController.class);
    private final AnganwadiInspectionService inspectionService;
    private final Validator validator; // Spring's Validator

    @Autowired
    public AnganwadiInspectionController(AnganwadiInspectionService inspectionService, Validator validator) {
        this.inspectionService = inspectionService;
        this.validator = validator;
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> createInspection(
            @RequestPart("inspection") @Valid AnganwadiInspection inspection,
            @RequestPart(name = "photos", required = false) MultipartFile[] photos) {
        
        // Manual validation block (optional, if @Valid on @RequestPart doesn't work as expected)
        // Errors errors = new BeanPropertyBindingResult(inspection, "inspection");
        // validator.validate(inspection, errors);
        // if (errors.hasErrors()) {
        //     Map<String, String> validationErrors = errors.getFieldErrors().stream()
        //         .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        //     logger.warn("Validation errors for inspection part: {}", validationErrors);
        //     return ResponseEntity.badRequest().body(validationErrors);
        // }

        try {
            logger.info("Received createInspection request for Anganwadi: {}", inspection.getAnganwadiNumber());
             if (photos != null) {
                logger.info("Number of photos received for create: {}", photos.length);
                for (MultipartFile photo : photos) {
                    if (photo != null && !photo.isEmpty()) {
                        logger.info("Photo (create): {}, size: {}", photo.getOriginalFilename(), photo.getSize());
                    }
                }
            } else {
                logger.info("No photos part received or photos array is null for create.");
            }
            AnganwadiInspection savedInspection = inspectionService.saveInspection(inspection, photos);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedInspection);
        } catch (IOException e) {
            logger.error("Error creating inspection with photos: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error uploading photos: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("Invalid argument for inspection: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            logger.error("Runtime error creating inspection: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error creating inspection: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<AnganwadiInspection>> getAllInspections() {
        logger.info("Received getAllInspections request");
        return ResponseEntity.ok(inspectionService.getAllInspections());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnganwadiInspection> getInspectionById(@PathVariable Long id) {
        logger.info("Received getInspectionById request for ID: {}", id);
        return inspectionService.getInspectionById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    logger.warn("Inspection not found for ID: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    // MODIFIED UPDATE METHOD
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"}) // Added consumes
    public ResponseEntity<?> updateInspection(@PathVariable Long id,
                                              @RequestPart("inspection") @Valid AnganwadiInspection updatedInspection, // Changed to @RequestPart
                                              @RequestPart(name = "photos", required = false) MultipartFile[] photos) { // Added photos part
        
        // Optional: Manual validation for 'inspection' part if @Valid doesn't trigger as expected
        // Errors errors = new BeanPropertyBindingResult(updatedInspection, "inspection");
        // validator.validate(updatedInspection, errors);
        // if (errors.hasErrors()) {
        //     Map<String, String> validationErrors = errors.getFieldErrors().stream()
        //         .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        //     logger.warn("Validation errors for update inspection part (ID: {}): {}", id, validationErrors);
        //     return ResponseEntity.badRequest().body(validationErrors);
        // }

        try {
            logger.info("Received updateInspection request for ID: {}", id);
            if (photos != null) {
                logger.info("Number of photos received for update (ID: {}): {}", id, photos.length);
                 for (MultipartFile photo : photos) {
                    if (photo != null && !photo.isEmpty()) {
                        logger.info("Photo (update ID: {}): {}, size: {}", id, photo.getOriginalFilename(), photo.getSize());
                    }
                }
            } else {
                logger.info("No photos part received or photos array is null for update (ID: {}). Existing photos may be retained or removed based on service logic if specific fields are nulled out.", id);
            }
            // Now pass the received photos (can be null or empty if not provided by client)
            AnganwadiInspection updated = inspectionService.updateInspection(id, updatedInspection, photos);
            return ResponseEntity.ok(updated);
        } catch (IOException e) {
            logger.error("Error updating inspection {} with photos: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error processing photo uploads during update: " + e.getMessage());
        } catch (IllegalArgumentException e) { // From service validation
            logger.warn("Update failed for ID {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (EntityNotFoundException e) { // Specifically catch this if service throws it
            logger.warn("Update failed, inspection not found for ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (RuntimeException e) { // Catch other general runtime errors
            logger.error("Runtime error updating inspection {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error updating inspection: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInspection(@PathVariable Long id) {
        try {
            logger.info("Received deleteInspection request for ID: {}", id);
            inspectionService.deleteInspection(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) { // Specifically catch this if service throws it
            logger.warn("Delete failed, inspection not found for ID {}: {}", id, e.getMessage());
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Or .body(e.getMessage())
        }
        catch (RuntimeException e) { // Catch other runtime exceptions
            logger.warn("Delete failed for ID {}: {}", id, e.getMessage());
            // Distinguish between not found and other errors if possible,
            // but for now, if not EntityNotFoundException, treat as server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(org.springframework.web.bind.MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
            logger.warn("Validation error - Field: {}, Message: {}", fieldName, errorMessage);
        });
        return errors;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleHttpMessageNotReadableException(org.springframework.http.converter.HttpMessageNotReadableException ex) {
        logger.warn("Bad Request: Invalid JSON format or data type mismatch. {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request payload: " + ex.getLocalizedMessage());
    }
    
    // Add handler for EntityNotFoundException if you want consistent error responses
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFoundException(EntityNotFoundException ex) {
        logger.warn("Resource not found: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}