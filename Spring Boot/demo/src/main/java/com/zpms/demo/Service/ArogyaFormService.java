package com.zpms.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zpms.demo.Register.ArogyaForm;
import com.zpms.demo.Repository.ArogyaFormRepository;

import java.util.List;
import java.util.Optional;
import java.util.Date;

@Service
public class ArogyaFormService {

    @Autowired
    private ArogyaFormRepository arogyaFormRepository;

    public List<ArogyaForm> getAllArogyaForms() {
        return arogyaFormRepository.findAll();
    }

    public Optional<ArogyaForm> getArogyaFormById(Long id) {
        return arogyaFormRepository.findById(id);
    }

    public ArogyaForm createArogyaForm(ArogyaForm arogyaForm) {
        arogyaForm.setCreated_at(new Date());
        return arogyaFormRepository.save(arogyaForm);
    }

    public ArogyaForm updateArogyaForm(Long id, ArogyaForm arogyaFormDetails) {
        Optional<ArogyaForm> arogyaForm = arogyaFormRepository.findById(id);
        
        if (arogyaForm.isPresent()) {
            ArogyaForm existingForm = arogyaForm.get();
            
            existingForm.setArogya_kendra_name(arogyaFormDetails.getArogya_kendra_name());
            existingForm.setUpkendra(arogyaFormDetails.getUpkendra());
            existingForm.setInspection_officer(arogyaFormDetails.getInspection_officer());
            existingForm.setOfficer_role(arogyaFormDetails.getOfficer_role());
            existingForm.setTaluka(arogyaFormDetails.getTaluka());
            existingForm.setInspection_date(arogyaFormDetails.getInspection_date());
            existingForm.setUpkendra_sankhya(arogyaFormDetails.getUpkendra_sankhya());
            existingForm.setGavanchi_sankhya(arogyaFormDetails.getGavanchi_sankhya());
            existingForm.setHealthCenterAvailability247(arogyaFormDetails.getHealthCenterAvailability247());
            existingForm.setHealthCenterAvailabilityIPHS(arogyaFormDetails.getHealthCenterAvailabilityIPHS());
            existingForm.setRKS_Sthapan(arogyaFormDetails.getRKS_Sthapan());
            existingForm.setRKS_Nondani(arogyaFormDetails.getRKS_Nondani());
            existingForm.setRKS_Sabha_Niyamit(arogyaFormDetails.getRKS_Sabha_Niyamit());
            existingForm.setRKS_Ekun_Sabha(arogyaFormDetails.getRKS_Ekun_Sabha());
            existingForm.setExecutive_Meetings(arogyaFormDetails.getExecutive_Meetings());
            existingForm.setGovernment_Meetings(arogyaFormDetails.getGovernment_Meetings());
            existingForm.setBahya_parisara_swachata(arogyaFormDetails.getBahya_parisara_swachata());
            existingForm.setVruksharopan(arogyaFormDetails.getVruksharopan());
            existingForm.setBiomedical_waste_vyavastha(arogyaFormDetails.getBiomedical_waste_vyavastha());
            existingForm.setPani_purvatha(arogyaFormDetails.getPani_purvatha());
            existingForm.setVidyut_purvatha(arogyaFormDetails.getVidyut_purvatha());
            existingForm.setVahan_chalu(arogyaFormDetails.getVahan_chalu());
            existingForm.setAushadhancha_satha(arogyaFormDetails.getAushadhancha_satha());
            existingForm.setVaidyakiya_adhikari_opd(arogyaFormDetails.getVaidyakiya_adhikari_opd());
            existingForm.setLasikaran_divas(arogyaFormDetails.getLasikaran_divas());
            existingForm.setMahiti_adhikar_board(arogyaFormDetails.getMahiti_adhikar_board());
            existingForm.setSanrakshak_bhint(arogyaFormDetails.getSanrakshak_bhint());
            existingForm.setLokseva_hakk_board(arogyaFormDetails.getLokseva_hakk_board());
            existingForm.setVai_opd_diwas(arogyaFormDetails.getVai_opd_diwas());
            existingForm.setSaha_rashtriya_aarogya(arogyaFormDetails.getSaha_rashtriya_aarogya());
            existingForm.setRugnansathi_waiting(arogyaFormDetails.getRugnansathi_waiting());
            existingForm.setDelivery_kit(arogyaFormDetails.getDelivery_kit());
            existingForm.setBaby_weight_machine(arogyaFormDetails.getBaby_weight_machine());
            existingForm.setCot_bed(arogyaFormDetails.getCot_bed());
            existingForm.setPrasuti_kakshat_protocol(arogyaFormDetails.getPrasuti_kakshat_protocol());
            existingForm.setEmergency_tray(arogyaFormDetails.getEmergency_tray());
            existingForm.setAdi_sirinj(arogyaFormDetails.getAdi_sirinj());
            existingForm.setRugnana_kespaper(arogyaFormDetails.getRugnana_kespaper());
            existingForm.setBaherun_aushadhi(arogyaFormDetails.getBaherun_aushadhi());
            existingForm.setDaily_expenditure(arogyaFormDetails.getDaily_expenditure());
            existingForm.setKespaper_opd_fee(arogyaFormDetails.getKespaper_opd_fee());
            existingForm.setWeight_machine_bp(arogyaFormDetails.getWeight_machine_bp());
            existingForm.setDelivery_room_swachata(arogyaFormDetails.getDelivery_room_swachata());
            existingForm.setKarmachari_ganveshat(arogyaFormDetails.getKarmachari_ganveshat());
            existingForm.setIec_material(arogyaFormDetails.getIec_material());
            existingForm.setArv_asv_satha(arogyaFormDetails.getArv_asv_satha());
            existingForm.setOrt_corner(arogyaFormDetails.getOrt_corner());
            existingForm.setPani_namune_tapasani(arogyaFormDetails.getPani_namune_tapasani());
            existingForm.setOpd_sankhya(arogyaFormDetails.getOpd_sankhya());
            existingForm.setIpd_sankhya(arogyaFormDetails.getIpd_sankhya());
            existingForm.setDelivery_sankhya(arogyaFormDetails.getDelivery_sankhya());
            existingForm.setKutumb_kalyan_shasrkriya(arogyaFormDetails.getKutumb_kalyan_shasrkriya());
            existingForm.setReferral_sankhya(arogyaFormDetails.getReferral_sankhya());
            existingForm.setTakraar_pustika(arogyaFormDetails.getTakraar_pustika());
            existingForm.setRugnanchya_natewaikansathi_suvidha(arogyaFormDetails.getRugnanchya_natewaikansathi_suvidha());
            existingForm.setParisarat_sathichya_aajarancha_pradurbhav(arogyaFormDetails.getParisarat_sathichya_aajarancha_pradurbhav());
            existingForm.setMata_mrutyu_sandarbh(arogyaFormDetails.getMata_mrutyu_sandarbh());
            existingForm.set_24_taas_atyavashyak_seva(arogyaFormDetails.get_24_taas_atyavashyak_seva());
            existingForm.setPaa_kendra_adiadchani(arogyaFormDetails.getPaa_kendra_adiadchani());
            existingForm.setPaa_kendramadhye_nikami_vastu(arogyaFormDetails.getPaa_kendramadhye_nikami_vastu());
            existingForm.setVaia_karmachari_atyavashyak_seva(arogyaFormDetails.getVaia_karmachari_atyavashyak_seva());
            existingForm.setPrashikshan_aavashyak_karmcharyache_naav(arogyaFormDetails.getPrashikshan_aavashyak_karmcharyache_naav());
            existingForm.setDrinking_water(arogyaFormDetails.getDrinking_water());
            existingForm.setTelephone(arogyaFormDetails.getTelephone());
            existingForm.setGenerator_inverter(arogyaFormDetails.getGenerator_inverter());
            existingForm.setVehicle(arogyaFormDetails.getVehicle());
            existingForm.setComputer_internet(arogyaFormDetails.getComputer_internet());
            existingForm.setSolar_water_heater(arogyaFormDetails.getSolar_water_heater());
            existingForm.setImage_filename_1(arogyaFormDetails.getImage_filename_1());
            existingForm.setImage_filename_2(arogyaFormDetails.getImage_filename_2());
            existingForm.setImage_filename_3(arogyaFormDetails.getImage_filename_3());
            existingForm.setImage_filename_4(arogyaFormDetails.getImage_filename_4());
            existingForm.setStatus(arogyaFormDetails.getStatus());
            
            return arogyaFormRepository.save(existingForm);
        }
        return null;
    }

    public void deleteArogyaForm(Long id) {
        arogyaFormRepository.deleteById(id);
    }
}