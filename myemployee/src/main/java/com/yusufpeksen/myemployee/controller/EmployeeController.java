package com.yusufpeksen.myemployee.controller;

import com.yusufpeksen.myemployee.model.Employee;
import com.yusufpeksen.myemployee.model.OurUser;
import com.yusufpeksen.myemployee.service.EmployeeService;
import com.yusufpeksen.myemployee.service.OurUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private OurUserService ourUserService;

    @GetMapping
    public List<Employee> getAllEmployees(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size) {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/startDate")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Employee> getAllEmployeesByStartDate(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size) {
        return employeeService.getAllEmployeesByStartDate();
    }

    @GetMapping("/lastName")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Employee> getAllEmployeesByLastName(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size) {
        return employeeService.getAllEmployeesByLastName();
    }

        @PostMapping
        @PreAuthorize("hasAuthority('ADMIN')")
        public Employee createEmployee(@RequestBody Employee employee) {
            return employeeService.saveEmployee(employee);
        }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = ((UserDetails) authentication.getPrincipal()).getUsername();

        Optional<Employee> employee = employeeService.getEmployeeById(id);
        if (employee.isPresent()) {
            Employee existingEmployee = employee.get();
            if (authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ADMIN"))) {
                existingEmployee.setFirstName(employeeDetails.getFirstName());
                existingEmployee.setLastName(employeeDetails.getLastName());
                existingEmployee.setBirthdate(employeeDetails.getBirthdate());
                existingEmployee.setJobTitle(employeeDetails.getJobTitle());
                existingEmployee.setStartDate(employeeDetails.getStartDate());
                existingEmployee.setPhotoPath(employeeDetails.getPhotoPath());
                return ResponseEntity.ok(employeeService.saveEmployee(existingEmployee));
            }

            Optional<OurUser> user = ourUserService.getOurUserByUsername(currentUsername);

            if (user.isPresent() && user.get().getEmployee().getId().equals(id)) {
                existingEmployee.setFirstName(employeeDetails.getFirstName());
                existingEmployee.setLastName(employeeDetails.getLastName());
                existingEmployee.setBirthdate(employeeDetails.getBirthdate());
                existingEmployee.setJobTitle(employeeDetails.getJobTitle());
                existingEmployee.setStartDate(employeeDetails.getStartDate());
                existingEmployee.setPhotoPath(employeeDetails.getPhotoPath());
                return ResponseEntity.ok(employeeService.saveEmployee(existingEmployee));
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employee = employeeService.getEmployeeById(id);
        return employee.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}