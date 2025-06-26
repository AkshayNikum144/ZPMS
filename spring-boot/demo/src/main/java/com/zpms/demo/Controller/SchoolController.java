package com.zpms.demo.Controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zpms.demo.Register.School;
import com.zpms.demo.Service.SchoolService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/school")
@CrossOrigin(origins = "http://localhost:4200/")
public class SchoolController {

    private final SchoolService schoolService;

    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    @PostMapping
    public ResponseEntity<School> createdSchool(@RequestBody School school){
        School save = schoolService.saveSchool(school);
        return ResponseEntity.ok(save);
    }

    @GetMapping
    public ResponseEntity<List<School>> getAllSchoolForms() {
        List<School> forms = schoolService.getAllSchool();
        return ResponseEntity.ok(forms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<School> getSchoolFormById(@PathVariable Long id) {
        Optional<School> formOpt = schoolService.getSchoolById(id);
        return formOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<School> updateSchoolForm(@PathVariable Long id, @RequestBody School updatedForm) {
        try {
            School form = schoolService.updateSchool(id, updatedForm);
            return ResponseEntity.ok(form);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete school form
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchoolForm(@PathVariable Long id) {
        schoolService.deleteSchool(id);
        return ResponseEntity.noContent().build();
    }



}
