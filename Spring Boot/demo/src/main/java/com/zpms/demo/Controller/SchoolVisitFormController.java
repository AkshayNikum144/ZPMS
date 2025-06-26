package com.zpms.demo.Controller;



import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.zpms.demo.Register.SchoolVisitForm;
import com.zpms.demo.Repository.SchoolVisitFormRepository;
import com.zpms.demo.Service.SchoolVisitFormService;

import java.util.List;

@RestController
@RequestMapping("/api/school-visits")
@Validated
public class SchoolVisitFormController {

    @Autowired
    private SchoolVisitFormService schoolVisitFormService;

    @Autowired
    private SchoolVisitFormRepository schoolVisitFormRepository;


    @PostMapping
    public ResponseEntity<SchoolVisitForm> createVisit(@Valid @RequestBody SchoolVisitForm visit) {
        SchoolVisitForm savedVisit = schoolVisitFormService.saveVisit(visit);
        return new ResponseEntity<>(savedVisit, HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<List<SchoolVisitForm>> getAllVisits() {
        List<SchoolVisitForm> visits = schoolVisitFormRepository.findAll();
        return ResponseEntity.ok(visits);
    }


    @GetMapping("/{id}")
    public ResponseEntity<SchoolVisitForm> getVisitById(@PathVariable Long id) {
        return schoolVisitFormRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PutMapping("/{id}")
    public ResponseEntity<SchoolVisitForm> updateVisit(@PathVariable Long id, @Valid @RequestBody SchoolVisitForm updatedVisit) {
        try {
            SchoolVisitForm visit = schoolVisitFormService.updateVisit(id, updatedVisit);
            return ResponseEntity.ok(visit);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 🔹 Delete visit by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        return schoolVisitFormRepository.findById(id).map(visit -> {
            schoolVisitFormRepository.delete(visit);
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
