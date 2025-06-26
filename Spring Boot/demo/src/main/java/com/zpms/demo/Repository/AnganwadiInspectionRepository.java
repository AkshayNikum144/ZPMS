package com.zpms.demo.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zpms.demo.Register.AnganwadiInspection;

@Repository
public interface AnganwadiInspectionRepository extends JpaRepository<AnganwadiInspection, Long> {



}
