package com.yusufpeksen.myemployee.repository;


import com.yusufpeksen.myemployee.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    List<Employee> findAllByOrderByStartDateAsc();
    List<Employee> findAllByOrderByLastNameAsc();
}
