package com.zpms.demo.Repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.zpms.demo.Register.School;

public interface SchoolRepository extends JpaRepository<School,Long> {



}
