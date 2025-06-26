package com.zpms.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zpms.demo.Register.Hospital;



@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
}