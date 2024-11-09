package com.yusufpeksen.myemployee.service;

import com.yusufpeksen.myemployee.model.Employee;
import com.yusufpeksen.myemployee.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployeesByStartDate() {
        return employeeRepository.findAllByOrderByStartDateAsc();
    }

    public List<Employee> getAllEmployeesByLastName() {
        return employeeRepository.findAllByOrderByLastNameAsc();
    }
}
