package com.zpms.demo.Register;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "arogyaform")
public class ArogyaForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Arogya Kendra name is required")
    private String arogya_kendra_name;

    @NotBlank(message = "Upkendra is required")
    private String upkendra;

    @NotBlank(message = "Inspection officer name is required")
    private String inspection_officer;

    @NotBlank(message = "Officer role is required")
    private String officer_role;

    @NotBlank(message = "Taluka is required")
    private String taluka;

    @NotNull(message = "Inspection date is required")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd") 
    private Date inspection_date;

    @NotNull(message = "Upkendra sankhya is required")
    private Integer upkendra_sankhya;

    @NotNull(message = "Gavanchi sankhya is required")
    private Integer gavanchi_sankhya;

    private Boolean HealthCenterAvailability247;
    private Boolean HealthCenterAvailabilityIPHS;
    private Boolean RKS_Sthapan;
    private Boolean RKS_Nondani;
    private Boolean RKS_Sabha_Niyamit;
    private Integer RKS_Ekun_Sabha;
    private Integer Executive_Meetings;
    private Integer Government_Meetings;
    private Boolean bahya_parisara_swachata;
    private Boolean vruksharopan;
    private Boolean biomedical_waste_vyavastha;
    private Boolean pani_purvatha;
    private Boolean vidyut_purvatha;
    private Boolean vahan_chalu;
    private Boolean aushadhancha_satha;
    private Boolean vaidyakiya_adhikari_opd;
    private Boolean lasikaran_divas;
    private Boolean mahiti_adhikar_board;
    private Boolean sanrakshak_bhint;
    private Boolean lokseva_hakk_board;
    private Boolean vai_opd_diwas;
    private Boolean saha_rashtriya_aarogya;
    private Boolean rugnansathi_waiting;
    private Boolean delivery_kit;
    private Boolean baby_weight_machine;
    private Boolean cot_bed;
    private Boolean prasuti_kakshat_protocol;
    private Boolean emergency_tray;
    private Boolean adi_sirinj;
    private Boolean rugnana_kespaper;
    private Boolean baherun_aushadhi;
    private Double daily_expenditure;
    private Double kespaper_opd_fee;
    private Boolean weight_machine_bp;
    private Boolean delivery_room_swachata;
    private Boolean karmachari_ganveshat;
    private Boolean iec_material;
    private Boolean arv_asv_satha;
    private Boolean ort_corner;
    private Boolean pani_namune_tapasani;
    private Integer opd_sankhya;
    private Integer ipd_sankhya;
    private Integer delivery_sankhya;
    private Integer kutumb_kalyan_shasrkriya;
    private Integer referral_sankhya;
    private Boolean takraar_pustika;
    private Boolean rugnanchya_natewaikansathi_suvidha;
    private String parisarat_sathichya_aajarancha_pradurbhav;
    private String mata_mrutyu_sandarbh;
    private Boolean _24_taas_atyavashyak_seva;
    private String paa_kendra_adiadchani;
    private String paa_kendramadhye_nikami_vastu;
    private String vaia_karmachari_atyavashyak_seva;
    private String prashikshan_aavashyak_karmcharyache_naav;
    private Boolean drinking_water;
    private Boolean telephone;
    private Boolean generator_inverter;
    private Boolean vehicle;
    private Boolean computer_internet;
    private Boolean solar_water_heater;
    private String image_filename_1;
    private String image_filename_2;
    private String image_filename_3;
    private String image_filename_4;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    private String status;

    // Default constructor
    public ArogyaForm() {
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getArogya_kendra_name() { return arogya_kendra_name; }
    public void setArogya_kendra_name(String arogya_kendra_name) { this.arogya_kendra_name = arogya_kendra_name; }

    public String getUpkendra() { return upkendra; }
    public void setUpkendra(String upkendra) { this.upkendra = upkendra; }

    public String getInspection_officer() { return inspection_officer; }
    public void setInspection_officer(String inspection_officer) { this.inspection_officer = inspection_officer; }

    public String getOfficer_role() { return officer_role; }
    public void setOfficer_role(String officer_role) { this.officer_role = officer_role; }

    public String getTaluka() { return taluka; }
    public void setTaluka(String taluka) { this.taluka = taluka; }

    public Date getInspection_date() { return inspection_date; }

    public void setInspection_date(Date inspection_date) { this.inspection_date = inspection_date; }

    public Integer getUpkendra_sankhya() { return upkendra_sankhya; }
    public void setUpkendra_sankhya(Integer upkendra_sankhya) { this.upkendra_sankhya = upkendra_sankhya; }

    public Integer getGavanchi_sankhya() { return gavanchi_sankhya; }
    public void setGavanchi_sankhya(Integer gavanchi_sankhya) { this.gavanchi_sankhya = gavanchi_sankhya; }

    public Boolean getHealthCenterAvailability247() { return HealthCenterAvailability247; }
    public void setHealthCenterAvailability247(Boolean healthCenterAvailability247) { this.HealthCenterAvailability247 = healthCenterAvailability247; }

    public Boolean getHealthCenterAvailabilityIPHS() { return HealthCenterAvailabilityIPHS; }
    public void setHealthCenterAvailabilityIPHS(Boolean healthCenterAvailabilityIPHS) { this.HealthCenterAvailabilityIPHS = healthCenterAvailabilityIPHS; }

    public Boolean getRKS_Sthapan() { return RKS_Sthapan; }
    public void setRKS_Sthapan(Boolean RKS_Sthapan) { this.RKS_Sthapan = RKS_Sthapan; }

    public Boolean getRKS_Nondani() { return RKS_Nondani; }
    public void setRKS_Nondani(Boolean RKS_Nondani) { this.RKS_Nondani = RKS_Nondani; }

    public Boolean getRKS_Sabha_Niyamit() { return RKS_Sabha_Niyamit; }
    public void setRKS_Sabha_Niyamit(Boolean RKS_Sabha_Niyamit) { this.RKS_Sabha_Niyamit = RKS_Sabha_Niyamit; }

    public Integer getRKS_Ekun_Sabha() { return RKS_Ekun_Sabha; }
    public void setRKS_Ekun_Sabha(Integer RKS_Ekun_Sabha) { this.RKS_Ekun_Sabha = RKS_Ekun_Sabha; }

    public Integer getExecutive_Meetings() { return Executive_Meetings; }
    public void setExecutive_Meetings(Integer Executive_Meetings) { this.Executive_Meetings = Executive_Meetings; }

    public Integer getGovernment_Meetings() { return Government_Meetings; }
    public void setGovernment_Meetings(Integer Government_Meetings) { this.Government_Meetings = Government_Meetings; }

    public Boolean getBahya_parisara_swachata() { return bahya_parisara_swachata; }
    public void setBahya_parisara_swachata(Boolean bahya_parisara_swachata) { this.bahya_parisara_swachata = bahya_parisara_swachata; }

    public Boolean getVruksharopan() { return vruksharopan; }
    public void setVruksharopan(Boolean vruksharopan) { this.vruksharopan = vruksharopan; }

    public Boolean getBiomedical_waste_vyavastha() { return biomedical_waste_vyavastha; }
    public void setBiomedical_waste_vyavastha(Boolean biomedical_waste_vyavastha) { this.biomedical_waste_vyavastha = biomedical_waste_vyavastha; }

    public Boolean getPani_purvatha() { return pani_purvatha; }
    public void setPani_purvatha(Boolean pani_purvatha) { this.pani_purvatha = pani_purvatha; }

    public Boolean getVidyut_purvatha() { return vidyut_purvatha; }
    public void setVidyut_purvatha(Boolean vidyut_purvatha) { this.vidyut_purvatha = vidyut_purvatha; }

    public Boolean getVahan_chalu() { return vahan_chalu; }
    public void setVahan_chalu(Boolean vahan_chalu) { this.vahan_chalu = vahan_chalu; }

    public Boolean getAushadhancha_satha() { return aushadhancha_satha; }
    public void setAushadhancha_satha(Boolean aushadhancha_satha) { this.aushadhancha_satha = aushadhancha_satha; }

    public Boolean getVaidyakiya_adhikari_opd() { return vaidyakiya_adhikari_opd; }
    public void setVaidyakiya_adhikari_opd(Boolean vaidyakiya_adhikari_opd) { this.vaidyakiya_adhikari_opd = vaidyakiya_adhikari_opd; }

    public Boolean getLasikaran_divas() { return lasikaran_divas; }
    public void setLasikaran_divas(Boolean lasikaran_divas) { this.lasikaran_divas = lasikaran_divas; }

    public Boolean getMahiti_adhikar_board() { return mahiti_adhikar_board; }
    public void setMahiti_adhikar_board(Boolean mahiti_adhikar_board) { this.mahiti_adhikar_board = mahiti_adhikar_board; }

    public Boolean getSanrakshak_bhint() { return sanrakshak_bhint; }
    public void setSanrakshak_bhint(Boolean sanrakshak_bhint) { this.sanrakshak_bhint = sanrakshak_bhint; }

    public Boolean getLokseva_hakk_board() { return lokseva_hakk_board; }
    public void setLokseva_hakk_board(Boolean lokseva_hakk_board) { this.lokseva_hakk_board = lokseva_hakk_board; }

    public Boolean getVai_opd_diwas() { return vai_opd_diwas; }
    public void setVai_opd_diwas(Boolean vai_opd_diwas) { this.vai_opd_diwas = vai_opd_diwas; }

    public Boolean getSaha_rashtriya_aarogya() { return saha_rashtriya_aarogya; }
    public void setSaha_rashtriya_aarogya(Boolean saha_rashtriya_aarogya) { this.saha_rashtriya_aarogya = saha_rashtriya_aarogya; }

    public Boolean getRugnansathi_waiting() { return rugnansathi_waiting; }
    public void setRugnansathi_waiting(Boolean rugnansathi_waiting) { this.rugnansathi_waiting = rugnansathi_waiting; }

    public Boolean getDelivery_kit() { return delivery_kit; }
    public void setDelivery_kit(Boolean delivery_kit) { this.delivery_kit = delivery_kit; }

    public Boolean getBaby_weight_machine() { return baby_weight_machine; }
    public void setBaby_weight_machine(Boolean baby_weight_machine) { this.baby_weight_machine = baby_weight_machine; }

    public Boolean getCot_bed() { return cot_bed; }
    public void setCot_bed(Boolean cot_bed) { this.cot_bed = cot_bed; }

    public Boolean getPrasuti_kakshat_protocol() { return prasuti_kakshat_protocol; }
    public void setPrasuti_kakshat_protocol(Boolean prasuti_kakshat_protocol) { this.prasuti_kakshat_protocol = prasuti_kakshat_protocol; }

    public Boolean getEmergency_tray() { return emergency_tray; }
    public void setEmergency_tray(Boolean emergency_tray) { this.emergency_tray = emergency_tray; }

    public Boolean getAdi_sirinj() { return adi_sirinj; }
    public void setAdi_sirinj(Boolean adi_sirinj) { this.adi_sirinj = adi_sirinj; }

    public Boolean getRugnana_kespaper() { return rugnana_kespaper; }
    public void setRugnana_kespaper(Boolean rugnana_kespaper) { this.rugnana_kespaper = rugnana_kespaper; }

    public Boolean getBaherun_aushadhi() { return baherun_aushadhi; }
    public void setBaherun_aushadhi(Boolean baherun_aushadhi) { this.baherun_aushadhi = baherun_aushadhi; }

    public Double getDaily_expenditure() { return daily_expenditure; }
    public void setDaily_expenditure(Double daily_expenditure) { this.daily_expenditure = daily_expenditure; }

    public Double getKespaper_opd_fee() { return kespaper_opd_fee; }
    public void setKespaper_opd_fee(Double kespaper_opd_fee) { this.kespaper_opd_fee = kespaper_opd_fee; }

    public Boolean getWeight_machine_bp() { return weight_machine_bp; }
    public void setWeight_machine_bp(Boolean weight_machine_bp) { this.weight_machine_bp = weight_machine_bp; }

    public Boolean getDelivery_room_swachata() { return delivery_room_swachata; }
    public void setDelivery_room_swachata(Boolean delivery_room_swachata) { this.delivery_room_swachata = delivery_room_swachata; }

    public Boolean getKarmachari_ganveshat() { return karmachari_ganveshat; }
    public void setKarmachari_ganveshat(Boolean karmachari_ganveshat) { this.karmachari_ganveshat = karmachari_ganveshat; }

    public Boolean getIec_material() { return iec_material; }
    public void setIec_material(Boolean iec_material) { this.iec_material = iec_material; }

    public Boolean getArv_asv_satha() { return arv_asv_satha; }
    public void setArv_asv_satha(Boolean arv_asv_satha) { this.arv_asv_satha = arv_asv_satha; }

    public Boolean getOrt_corner() { return ort_corner; }
    public void setOrt_corner(Boolean ort_corner) { this.ort_corner = ort_corner; }

    public Boolean getPani_namune_tapasani() { return pani_namune_tapasani; }
    public void setPani_namune_tapasani(Boolean pani_namune_tapasani) { this.pani_namune_tapasani = pani_namune_tapasani; }

    public Integer getOpd_sankhya() { return opd_sankhya; }
    public void setOpd_sankhya(Integer opd_sankhya) { this.opd_sankhya = opd_sankhya; }

    public Integer getIpd_sankhya() { return ipd_sankhya; }
    public void setIpd_sankhya(Integer ipd_sankhya) { this.ipd_sankhya = ipd_sankhya; }

    public Integer getDelivery_sankhya() { return delivery_sankhya; }
    public void setDelivery_sankhya(Integer delivery_sankhya) { this.delivery_sankhya = delivery_sankhya; }

    public Integer getKutumb_kalyan_shasrkriya() { return kutumb_kalyan_shasrkriya; }
    public void setKutumb_kalyan_shasrkriya(Integer kutumb_kalyan_shasrkriya) { this.kutumb_kalyan_shasrkriya = kutumb_kalyan_shasrkriya; }

    public Integer getReferral_sankhya() { return referral_sankhya; }
    public void setReferral_sankhya(Integer referral_sankhya) { this.referral_sankhya = referral_sankhya; }

    public Boolean getTakraar_pustika() { return takraar_pustika; }
    public void setTakraar_pustika(Boolean takraar_pustika) { this.takraar_pustika = takraar_pustika; }

    public Boolean getRugnanchya_natewaikansathi_suvidha() { return rugnanchya_natewaikansathi_suvidha; }
    public void setRugnanchya_natewaikansathi_suvidha(Boolean rugnanchya_natewaikansathi_suvidha) { this.rugnanchya_natewaikansathi_suvidha = rugnanchya_natewaikansathi_suvidha; }

    public String getParisarat_sathichya_aajarancha_pradurbhav() { return parisarat_sathichya_aajarancha_pradurbhav; }
    public void setParisarat_sathichya_aajarancha_pradurbhav(String parisarat_sathichya_aajarancha_pradurbhav) { this.parisarat_sathichya_aajarancha_pradurbhav = parisarat_sathichya_aajarancha_pradurbhav; }

    public String getMata_mrutyu_sandarbh() { return mata_mrutyu_sandarbh; }
    public void setMata_mrutyu_sandarbh(String mata_mrutyu_sandarbh) { this.mata_mrutyu_sandarbh = mata_mrutyu_sandarbh; }

    public Boolean get_24_taas_atyavashyak_seva() { return _24_taas_atyavashyak_seva; }
    public void set_24_taas_atyavashyak_seva(Boolean _24_taas_atyavashyak_seva) { this._24_taas_atyavashyak_seva = _24_taas_atyavashyak_seva; }

    public String getPaa_kendra_adiadchani() { return paa_kendra_adiadchani; }
    public void setPaa_kendra_adiadchani(String paa_kendra_adiadchani) { this.paa_kendra_adiadchani = paa_kendra_adiadchani; }

    public String getPaa_kendramadhye_nikami_vastu() { return paa_kendramadhye_nikami_vastu; }
    public void setPaa_kendramadhye_nikami_vastu(String paa_kendramadhye_nikami_vastu) { this.paa_kendramadhye_nikami_vastu = paa_kendramadhye_nikami_vastu; }

    public String getVaia_karmachari_atyavashyak_seva() { return vaia_karmachari_atyavashyak_seva; }
    public void setVaia_karmachari_atyavashyak_seva(String vaia_karmachari_atyavashyak_seva) { this.vaia_karmachari_atyavashyak_seva = vaia_karmachari_atyavashyak_seva; }

    public String getPrashikshan_aavashyak_karmcharyache_naav() { return prashikshan_aavashyak_karmcharyache_naav; }
    public void setPrashikshan_aavashyak_karmcharyache_naav(String prashikshan_aavashyak_karmcharyache_naav) { this.prashikshan_aavashyak_karmcharyache_naav = prashikshan_aavashyak_karmcharyache_naav; }

    public Boolean getDrinking_water() { return drinking_water; }
    public void setDrinking_water(Boolean drinking_water) { this.drinking_water = drinking_water; }

    public Boolean getTelephone() { return telephone; }
    public void setTelephone(Boolean telephone) { this.telephone = telephone; }

    public Boolean getGenerator_inverter() { return generator_inverter; }
    public void setGenerator_inverter(Boolean generator_inverter) { this.generator_inverter = generator_inverter; }

    public Boolean getVehicle() { return vehicle; }
    public void setVehicle(Boolean vehicle) { this.vehicle = vehicle; }

    public Boolean getComputer_internet() { return computer_internet; }
    public void setComputer_internet(Boolean computer_internet) { this.computer_internet = computer_internet; }

    public Boolean getSolar_water_heater() { return solar_water_heater; }
    public void setSolar_water_heater(Boolean solar_water_heater) { this.solar_water_heater = solar_water_heater; }

    public String getImage_filename_1() { return image_filename_1; }
    public void setImage_filename_1(String image_filename_1) { this.image_filename_1 = image_filename_1; }

    public String getImage_filename_2() { return image_filename_2; }
    public void setImage_filename_2(String image_filename_2) { this.image_filename_2 = image_filename_2; }

    public String getImage_filename_3() { return image_filename_3; }
    public void setImage_filename_3(String image_filename_3) { this.image_filename_3 = image_filename_3; }

    public String getImage_filename_4() { return image_filename_4; }
    public void setImage_filename_4(String image_filename_4) { this.image_filename_4 = image_filename_4; }

    public Date getCreated_at() { return created_at; }
    public void setCreated_at(Date created_at) { this.created_at = created_at; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
