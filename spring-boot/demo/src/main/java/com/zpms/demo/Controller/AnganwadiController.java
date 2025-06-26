package com.zpms.demo.Controller;

import com.zpms.demo.Register.Anganwadi;
import com.zpms.demo.Service.AnganwadiService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/anganwadi")
@CrossOrigin(origins = "http://localhost:4200/")
public class AnganwadiController {

    private static final Logger logger = LoggerFactory.getLogger(AnganwadiController.class);
    private final AnganwadiService anganwadiService;

    @Autowired
    public AnganwadiController(AnganwadiService anganwadiService) {
        this.anganwadiService = anganwadiService;
    }

    // Create
    @PostMapping
    public ResponseEntity<Anganwadi> createAnganwadi(@Valid @RequestBody Anganwadi anganwadi) {
        logger.info("Controller: Received request to create Anganwadi: {}", anganwadi.getAnganwadiCenterName());
        // The anganwadi object here will have entryDate as LocalDate if JSON was yyyy-MM-dd
        Anganwadi saved = anganwadiService.saveAnganwadi(anganwadi);
        logger.info("Controller: Anganwadi created successfully with ID: {}", saved.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(saved); // 201 Created is more appropriate
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<Anganwadi>> getAllAnganwadis() {
        logger.info("Controller: Received request to get all Anganwadis");
        List<Anganwadi> anganwadis = anganwadiService.getAllAnganwadis();
        return ResponseEntity.ok(anganwadis);
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<Anganwadi> getAnganwadiById(@PathVariable Long id) {
        logger.info("Controller: Received request to get Anganwadi by ID: {}", id);
        return anganwadiService.getAnganwadiById(id)
                .map(anganwadi -> {
                    logger.info("Controller: Found Anganwadi with ID: {}", id);
                    return ResponseEntity.ok(anganwadi);
                })
                .orElseGet(() -> {
                    logger.warn("Controller: Anganwadi not found with ID: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Anganwadi> updateAnganwadi(@PathVariable Long id, @Valid @RequestBody Anganwadi updatedAnganwadi) {
        logger.info("Controller: Received request to update Anganwadi with ID: {}", id);
        try {
            Anganwadi updated = anganwadiService.updateAnganwadi(id, updatedAnganwadi);
            logger.info("Controller: Anganwadi updated successfully with ID: {}", updated.getId());
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) { // Catch specific exception if you have one (e.g., ResourceNotFoundException)
            logger.warn("Controller: Update failed for Anganwadi ID: {}. Reason: {}", id, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnganwadi(@PathVariable Long id) {
        logger.info("Controller: Received request to delete Anganwadi with ID: {}", id);
        try {
            anganwadiService.deleteAnganwadi(id);
            logger.info("Controller: Anganwadi deleted successfully with ID: {}", id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (RuntimeException e) { // Catch specific exception
            logger.warn("Controller: Delete failed for Anganwadi ID: {}. Reason: {}", id, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    // --- Exception Handler for Validation Errors ---
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
            logger.warn("Validation error - Field: {}, Message: {}", fieldName, errorMessage);
        });
        return errors;
    }

    // --- Generic Exception Handler (optional, for unhandled runtime exceptions) ---
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        logger.error("Controller: An unexpected error occurred: ", ex);
        // Check if the exception is due to file size limit
        if (ex.getCause() instanceof org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException || 
            ex instanceof org.springframework.web.multipart.MaxUploadSizeExceededException) {
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body("File size exceeds the configured limit.");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + ex.getMessage());
    }
}