package com.zpms.demo.Service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // For transactional methods

import com.zpms.demo.Register.Anganwadi;
import com.zpms.demo.Repository.AnganwadiInformationRepository; // Assuming this is your repository name

// Define a custom exception for resource not found
class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

@Service
public class AnganwadiService {

    private static final Logger logger = LoggerFactory.getLogger(AnganwadiService.class);
    private final AnganwadiInformationRepository anganwadiInformationRepository;

    @Autowired
    public AnganwadiService(AnganwadiInformationRepository anganwadiInformationRepository) {
        this.anganwadiInformationRepository = anganwadiInformationRepository;
    }

    // Create or Save
    @Transactional
    public Anganwadi saveAnganwadi(Anganwadi anganwadi) {
        logger.info("Service: Attempting to save Anganwadi: {}", anganwadi.getAnganwadiCenterName());
        // Additional validation or business logic can be added here before saving
        Anganwadi savedAnganwadi = anganwadiInformationRepository.save(anganwadi);
        logger.info("Service: Successfully saved Anganwadi with ID: {}", savedAnganwadi.getId());
        return savedAnganwadi;
    }

    // Read all
    public List<Anganwadi> getAllAnganwadis() {
        logger.info("Service: Fetching all Anganwadis");
        return anganwadiInformationRepository.findAll();
    }

    // Read by ID
    public Optional<Anganwadi> getAnganwadiById(Long id) {
        logger.info("Service: Fetching Anganwadi by ID: {}", id);
        Optional<Anganwadi> anganwadi = anganwadiInformationRepository.findById(id);
        if (anganwadi.isEmpty()) {
            logger.warn("Service: Anganwadi not found with ID: {}", id);
        }
        return anganwadi;
    }

    // Update
    @Transactional
    public Anganwadi updateAnganwadi(Long id, Anganwadi updatedAnganwadiDetails) {
        logger.info("Service: Attempting to update Anganwadi with ID: {}", id);
        Anganwadi existingAnganwadi = anganwadiInformationRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Service: Anganwadi not found for update with ID: {}", id);
                    return new ResourceNotFoundException("Anganwadi not found with id: " + id);
                });

        logger.info("Service: Found existing Anganwadi for update: {}", existingAnganwadi.getId());
        // Update only non-null fields from updatedAnganwadiDetails or all fields as per requirement
        existingAnganwadi.setEntryDate(updatedAnganwadiDetails.getEntryDate());
        existingAnganwadi.setProjectName(updatedAnganwadiDetails.getProjectName());
        existingAnganwadi.setBeatName(updatedAnganwadiDetails.getBeatName());
        existingAnganwadi.setAnganwadiCenterName(updatedAnganwadiDetails.getAnganwadiCenterName());
        existingAnganwadi.setAnganwadiNumber(updatedAnganwadiDetails.getAnganwadiNumber());
        existingAnganwadi.setAnganwadiWorkerName(updatedAnganwadiDetails.getAnganwadiWorkerName());
        existingAnganwadi.setWorkerMobileNumber(updatedAnganwadiDetails.getWorkerMobileNumber());
        existingAnganwadi.setWorkerServiceDurationYears(updatedAnganwadiDetails.getWorkerServiceDurationYears());
        existingAnganwadi.setWorkerResponsibility(updatedAnganwadiDetails.getWorkerResponsibility());
        existingAnganwadi.setBeneficiaries0To6Months(updatedAnganwadiDetails.getBeneficiaries0To6Months());
        existingAnganwadi.setBeneficiariesTotal(updatedAnganwadiDetails.getBeneficiariesTotal());
        existingAnganwadi.setFoodSupply6Months3Years(updatedAnganwadiDetails.getFoodSupply6Months3Years());
        existingAnganwadi.setDrinkingWaterFacility(updatedAnganwadiDetails.getDrinkingWaterFacility());
        existingAnganwadi.setEducationalMaterialAvailable(updatedAnganwadiDetails.getEducationalMaterialAvailable());
        existingAnganwadi.setToyMaterialAvailable(updatedAnganwadiDetails.getToyMaterialAvailable());
        existingAnganwadi.setMedicalCheckupFacility(updatedAnganwadiDetails.getMedicalCheckupFacility());
        existingAnganwadi.setRemarks(updatedAnganwadiDetails.getRemarks());

        Anganwadi newlyUpdated = anganwadiInformationRepository.save(existingAnganwadi);
        logger.info("Service: Successfully updated Anganwadi with ID: {}", newlyUpdated.getId());
        return newlyUpdated;
    }

    // Delete
    @Transactional
    public void deleteAnganwadi(Long id) {
        logger.info("Service: Attempting to delete Anganwadi with ID: {}", id);
        if (anganwadiInformationRepository.existsById(id)) {
            anganwadiInformationRepository.deleteById(id);
            logger.info("Service: Successfully deleted Anganwadi with ID: {}", id);
        } else {
            logger.warn("Service: Anganwadi not found for deletion with ID: {}", id);
            throw new ResourceNotFoundException("Anganwadi not found with id: " + id + " for deletion.");
        }
    }
}