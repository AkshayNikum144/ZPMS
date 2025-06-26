package com.zpms.demo.Service;


import org.springframework.stereotype.Service;

import com.zpms.demo.Register.SchoolVisitForm;
import com.zpms.demo.Repository.SchoolVisitFormRepository;

import java.math.RoundingMode;
import java.text.DecimalFormat;

@Service
public class SchoolVisitFormService {

    private final SchoolVisitFormRepository schoolVisitFormRepository;
    private final DecimalFormat decimalFormat;
    
    // Fix the constructor parameter
    public SchoolVisitFormService(SchoolVisitFormRepository schoolVisitFormRepository) {
        this.schoolVisitFormRepository = schoolVisitFormRepository;
        this.decimalFormat = new DecimalFormat("#0.00");
        this.decimalFormat.setRoundingMode(RoundingMode.HALF_UP);
    }

    public SchoolVisitForm saveVisit(SchoolVisitForm visit) {
        computeDerivedFields(visit);
        return schoolVisitFormRepository.save(visit);
    }

    private void computeDerivedFields(SchoolVisitForm visit) {

        // रिक्त शिक्षक संख्या = मंजूर - कार्यरत
        if (visit.getApprovedTeachers() != null && visit.getWorkingTeachers() != null) {
            int vacant = visit.getApprovedTeachers() - visit.getWorkingTeachers();
            visit.setVacantTeachers(Math.max(vacant, 0));
        }

        // एकूण पट = मुले + मुली
        if (visit.getBoysCount() != null && visit.getGirlsCount() != null) {
            int totalCount = visit.getBoysCount() + visit.getGirlsCount();
            visit.setTotalCount(totalCount);
        }

        // एकूण हजर = हजर मुले + हजर मुली
        if (visit.getBoysPresent() != null && visit.getGirlsPresent() != null) {
            int totalPresent = visit.getBoysPresent() + visit.getGirlsPresent();
            visit.setTotalPresent(totalPresent);
        }

        // एकूण गैरहजर = एकूण पट - एकूण हजर
        if (visit.getTotalCount() != null && visit.getTotalPresent() != null) {
            int totalAbsent = visit.getTotalCount() - visit.getTotalPresent();
            visit.setTotalAbsent(Math.max(totalAbsent, 0));
        }

        // हजर टक्केवारी
        if (visit.getTotalCount() != null && visit.getTotalCount() > 0 && visit.getTotalPresent() != null) {
            double presentPercentage = (visit.getTotalPresent() * 100.0) / visit.getTotalCount();
            visit.setAttendancePercentagePresent(decimalFormat.format(presentPercentage));
        }

        // गैरहजर टक्केवारी
        if (visit.getTotalCount() != null && visit.getTotalAbsent() != null && visit.getTotalCount() > 0) {
            double absentPercentage = (visit.getTotalAbsent() * 100.0) / visit.getTotalCount();
            visit.setAttendancePercentageAbsent(decimalFormat.format(absentPercentage));
        }

        // पट टक्केवारी (teachers present over total count)
        if (visit.getPresentteachers() != null && visit.getTotalCount() != null && visit.getTotalCount() > 0) {
            double attendancePercentage = (visit.getPresentteachers() * 100.0) / visit.getTotalCount();
            visit.setAttendancePercentage(decimalFormat.format(attendancePercentage));
        }

        // मुले गैरहजर = पट - हजर
        if (visit.getBoysCount() != null && visit.getBoysPresent() != null) {
            visit.setBoysAbsent(Math.max(visit.getBoysCount() - visit.getBoysPresent(), 0));
        }

        // मुली गैरहजर = पट - हजर
        if (visit.getGirlsCount() != null && visit.getGirlsPresent() != null) {
            visit.setGirlsAbsent(Math.max(visit.getGirlsCount() - visit.getGirlsPresent(), 0));
        }
    }

    public SchoolVisitForm updateVisit(Long id, SchoolVisitForm updatedVisit) {
        return schoolVisitFormRepository.findById(id).map(existing -> {
            updatedVisit.setId(existing.getId());
            computeDerivedFields(updatedVisit);
            return schoolVisitFormRepository.save(updatedVisit);
        }).orElseThrow(() -> new RuntimeException("Visit not found with id " + id));
    }
}
