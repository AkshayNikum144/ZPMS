package com.zpms.demo.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.zpms.demo.Register.SchoolVisitForm;

public interface SchoolVisitFormRepository extends JpaRepository<SchoolVisitForm,Long> {
}
