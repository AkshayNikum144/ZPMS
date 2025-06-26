package com.zpms.demo.Service;


import org.springframework.stereotype.Service;

import com.zpms.demo.Register.School;
import com.zpms.demo.Repository.SchoolRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SchoolService {

    private final SchoolRepository schoolRepository;

    public SchoolService(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    public School saveSchool(School school){
        return schoolRepository.save(school);
    }

    public List<School> getAllSchool(){
        return schoolRepository.findAll();
    }

    public Optional<School> getSchoolById(Long id){
        return schoolRepository.findById(id);
    }

    public School updateSchool(Long id, School updateForm){
        Optional<School> form = schoolRepository.findById(id);
        if(form.isPresent()){
            School form_data = form.get();
            form_data.setDate(updateForm.getDate());
            form_data.setOrganizationName(updateForm.getOrganizationName());
            form_data.setSchoolName(updateForm.getSchoolName());
            form_data.setUdiseNumber(updateForm.getUdiseNumber());
            form_data.setGoogleLocationLink(updateForm.getGoogleLocationLink());
            form_data.setCategory(updateForm.getCategory());
            form_data.setFullAddress(updateForm.getFullAddress());
            form_data.setTaluka(updateForm.getTaluka());
            form_data.setDistrict(updateForm.getDistrict());
            form_data.setPincode(updateForm.getPincode());
            form_data.setHeadmastersName(updateForm.getHeadmastersName());
            form_data.setHeadmastersMobileNumber(updateForm.getHeadmastersMobileNumber());

         return schoolRepository.save(form_data);
    } else {
        throw new RuntimeException("School form with ID " + id + " not found.");
    }
    }

    public void deleteSchool(Long id){
        schoolRepository.deleteById(id);
    }

}
