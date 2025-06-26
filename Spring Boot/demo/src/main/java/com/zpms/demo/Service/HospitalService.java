package com.zpms.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zpms.demo.Register.Hospital;
import com.zpms.demo.Repository.HospitalRepository;


@Service
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Optional<Hospital> getHospitalById(Long id) {
        return hospitalRepository.findById(id);
    }

    public Hospital createHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public Hospital updateHospital(Long id, Hospital hospitalDetails) {
        Optional<Hospital> hospital = hospitalRepository.findById(id);

        if (hospital.isPresent()) {
            Hospital existingHospital = hospital.get();
            existingHospital.setPhcName(hospitalDetails.getPhcName());
            existingHospital.setSubcenterName(hospitalDetails.getSubcenterName());
            existingHospital.setVillagePhcId(hospitalDetails.getVillagePhcId());
            existingHospital.setMonthName(hospitalDetails.getMonthName());
            existingHospital.setCataractSuspectedTotal(hospitalDetails.getCataractSuspectedTotal());
            existingHospital.setCataractScreenedTotal(hospitalDetails.getCataractScreenedTotal());
            existingHospital.setCataractMatureCases(hospitalDetails.getCataractMatureCases());
            existingHospital.setCataractImmatureCases(hospitalDetails.getCataractImmatureCases());
            existingHospital.setCataractSurgeryDone(hospitalDetails.getCataractSurgeryDone());
            existingHospital.setCataractFollowupTotal(hospitalDetails.getCataractFollowupTotal());
            existingHospital.setHtnSuspectedTotal(hospitalDetails.getHtnSuspectedTotal());
            existingHospital.setHtnReferredTotal(hospitalDetails.getHtnReferredTotal());
            existingHospital.setHtnOnTreatmentTotal(hospitalDetails.getHtnOnTreatmentTotal());
            existingHospital.setHtnOnCounselingNotOnTreatment(hospitalDetails.getHtnOnCounselingNotOnTreatment());
            existingHospital.setHtnTreatmentAndFollowup(hospitalDetails.getHtnTreatmentAndFollowup());
            existingHospital.setDmSuspectedTotal(hospitalDetails.getDmSuspectedTotal());
            existingHospital.setDmReferredTotal(hospitalDetails.getDmReferredTotal());
            existingHospital.setDmOnTreatmentTotal(hospitalDetails.getDmOnTreatmentTotal());
            existingHospital.setDmOnCounselingNotOnTreatment(hospitalDetails.getDmOnCounselingNotOnTreatment());
            existingHospital.setDmTreatmentFollowup(hospitalDetails.getDmTreatmentFollowup());
            existingHospital.setTbSuspectedTotal(hospitalDetails.getTbSuspectedTotal());
            existingHospital.setTbReferredForXrayTotal(hospitalDetails.getTbReferredForXrayTotal());
            existingHospital.setTbSputumCollectedTotal(hospitalDetails.getTbSputumCollectedTotal());
            existingHospital.setTbDiagnosedTotal(hospitalDetails.getTbDiagnosedTotal());
            existingHospital.setTbOnTreatmentTotal(hospitalDetails.getTbOnTreatmentTotal());
            existingHospital.setLeprosySuspectedTotal(hospitalDetails.getLeprosySuspectedTotal());
            existingHospital.setLeprosyReferredTotal(hospitalDetails.getLeprosyReferredTotal());
            existingHospital.setLeprosyDiagnosedTotal(hospitalDetails.getLeprosyDiagnosedTotal());
            existingHospital.setLeprosyOnTreatmentTotal(hospitalDetails.getLeprosyOnTreatmentTotal());
            existingHospital
                    .setLeprosyReconstructiveSurgeryTotal(hospitalDetails.getLeprosyReconstructiveSurgeryTotal());
            existingHospital.setOralCancerSuspectedTotal(hospitalDetails.getOralCancerSuspectedTotal());
            existingHospital.setOralCancerReferredTotal(hospitalDetails.getOralCancerReferredTotal());
            existingHospital.setOralCancerDiagnosedTotal(hospitalDetails.getOralCancerDiagnosedTotal());
            existingHospital.setOralCancerChemoTherapy(hospitalDetails.getOralCancerChemoTherapy());
            existingHospital.setOralCancerSurgeryDone(hospitalDetails.getOralCancerSurgeryDone());
            existingHospital.setBreastCancerSuspectedTotal(hospitalDetails.getBreastCancerSuspectedTotal());
            existingHospital.setBreastCancerReferredTotal(hospitalDetails.getBreastCancerReferredTotal());
            existingHospital.setBreastCancerDiagnosedTotal(hospitalDetails.getBreastCancerDiagnosedTotal());
            existingHospital.setBreastCancerChemoTherapy(hospitalDetails.getBreastCancerChemoTherapy());
            existingHospital.setBreastCancerSurgeryDone(hospitalDetails.getBreastCancerSurgeryDone());
            existingHospital.setCervicalCancerSuspectedTotal(hospitalDetails.getCervicalCancerSuspectedTotal());
            existingHospital.setCervicalCancerReferredTotal(hospitalDetails.getCervicalCancerReferredTotal());
            existingHospital.setCervicalCancerDiagnosedTotal(hospitalDetails.getCervicalCancerDiagnosedTotal());
            existingHospital.setCervicalCancerChemoTherapy(hospitalDetails.getCervicalCancerChemoTherapy());
            existingHospital.setCervicalCancerSurgeryDone(hospitalDetails.getCervicalCancerSurgeryDone());
            existingHospital.setHplcSamplesSentTotal(hospitalDetails.getHplcSamplesSentTotal());
            existingHospital.setHplcAsCarrierCount(hospitalDetails.getHplcAsCarrierCount());
            existingHospital.setHplcSsCarrierCount(hospitalDetails.getHplcSsCarrierCount());

            return hospitalRepository.save(existingHospital);
        }
        return null;
    }

    public void deleteHospital(Long id) {
        hospitalRepository.deleteById(id);
    }
}