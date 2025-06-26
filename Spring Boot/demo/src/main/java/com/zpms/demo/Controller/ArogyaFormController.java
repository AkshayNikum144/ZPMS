// package com.zpms.demo.Controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.zpms.demo.Register.ArogyaForm;
// import com.zpms.demo.Service.ArogyaFormService;

// import jakarta.validation.Valid;
// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/api/arogya-forms")
// @CrossOrigin(origins = "http://localhost:4200/")
// public class ArogyaFormController {

//     @Autowired
//     private ArogyaFormService arogyaFormService;

//     @GetMapping
//     public List<ArogyaForm> getAllArogyaForms() {
//         return arogyaFormService.getAllArogyaForms();
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<ArogyaForm> getArogyaFormById(@PathVariable Long id) {
//         Optional<ArogyaForm> arogyaForm = arogyaFormService.getArogyaFormById(id);
//         return arogyaForm.map(ResponseEntity::ok)
//                 .orElseGet(() -> ResponseEntity.notFound().build());
//     }

//     @PostMapping
//     public ArogyaForm createArogyaForm(@Valid @RequestBody ArogyaForm arogyaForm) {
//         return arogyaFormService.createArogyaForm(arogyaForm);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<ArogyaForm> updateArogyaForm(@PathVariable Long id,
//                                                       @Valid @RequestBody ArogyaForm arogyaFormDetails) {
//         ArogyaForm updatedArogyaForm = arogyaFormService.updateArogyaForm(id, arogyaFormDetails);
//         if (updatedArogyaForm == null) {
//             return ResponseEntity.notFound().build();
//         }
//         return ResponseEntity.ok(updatedArogyaForm);
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<?> deleteArogyaForm(@PathVariable Long id) {
//         try {
//             arogyaFormService.deleteArogyaForm(id);
//             return ResponseEntity.ok().build();
//         } catch (Exception e) {
//             return ResponseEntity.internalServerError().build();
//         }
//     }
// }
// src/main/java/com/zpms/demo/Controller/ArogyaFormController.java
package com.zpms.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.zpms.demo.Register.ArogyaForm;
import com.zpms.demo.Service.ArogyaFormService;
import com.zpms.demo.Service.FileStorageService; // <-- IMPORT THIS
import java.io.IOException; // <-- IMPORT THIS
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/arogya-forms")
@CrossOrigin(origins = "http://localhost:4200/")
public class ArogyaFormController {

    @Autowired
    private ArogyaFormService arogyaFormService;
    
    @Autowired
    private FileStorageService fileStorageService; // <-- INJECT THE NEW SERVICE

    // ... your getAllArogyaForms() and getArogyaFormById() methods remain the same ...

    @GetMapping
    public List<ArogyaForm> getAllArogyaForms() {
        return arogyaFormService.getAllArogyaForms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArogyaForm> getArogyaFormById(@PathVariable Long id) {
        Optional<ArogyaForm> arogyaForm = arogyaFormService.getArogyaFormById(id);
        return arogyaForm.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ========== THIS IS THE CORRECTED METHOD ==========
    @PostMapping(consumes = { "multipart/form-data" }) // Specify that this method consumes multipart data
    public ArogyaForm createArogyaForm(
            @ModelAttribute ArogyaForm arogyaForm, // Use @ModelAttribute to bind form fields to the object
            @RequestPart(value = "image_file_1", required = false) MultipartFile imageFile1,
            @RequestPart(value = "image_file_2", required = false) MultipartFile imageFile2,
            @RequestPart(value = "image_file_3", required = false) MultipartFile imageFile3,
            @RequestPart(value = "image_file_4", required = false) MultipartFile imageFile4
    ) throws IOException {
        
        // Handle file uploads and set filenames on the entity
        if (imageFile1 != null && !imageFile1.isEmpty()) {
            String fileName = fileStorageService.storeFile(imageFile1);
            arogyaForm.setImage_filename_1(fileName);
        }
        if (imageFile2 != null && !imageFile2.isEmpty()) {
            String fileName = fileStorageService.storeFile(imageFile2);
            arogyaForm.setImage_filename_2(fileName);
        }
        if (imageFile3 != null && !imageFile3.isEmpty()) {
            String fileName = fileStorageService.storeFile(imageFile3);
            arogyaForm.setImage_filename_3(fileName);
        }
        if (imageFile4 != null && !imageFile4.isEmpty()) {
            String fileName = fileStorageService.storeFile(imageFile4);
            arogyaForm.setImage_filename_4(fileName);
        }

        // Call the service to save the fully populated object
        return arogyaFormService.createArogyaForm(arogyaForm);
    }
    
    // ... your update and delete methods can remain for now, but update will also need this treatment if you want to edit images ...
    
    @PutMapping("/{id}")
    public ResponseEntity<ArogyaForm> updateArogyaForm(@PathVariable Long id,
                                                      @RequestBody ArogyaForm arogyaFormDetails) {
        // Note: This update method will NOT handle file changes. To do that,
        // it would need to be changed to a multipart handler just like the create method.
        ArogyaForm updatedArogyaForm = arogyaFormService.updateArogyaForm(id, arogyaFormDetails);
        if (updatedArogyaForm == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedArogyaForm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArogyaForm(@PathVariable Long id) {
        try {
            arogyaFormService.deleteArogyaForm(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}