package com.zpms.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zpms.demo.Register.ArogyaForm;


@Repository
public interface ArogyaFormRepository extends JpaRepository<ArogyaForm, Long> {
    
}