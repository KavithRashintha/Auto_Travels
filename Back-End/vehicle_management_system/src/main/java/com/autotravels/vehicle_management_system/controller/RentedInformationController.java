package com.autotravels.vehicle_management_system.controller;

import com.autotravels.vehicle_management_system.model.RentedInformation;
import com.autotravels.vehicle_management_system.service.RentedInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rentedInformation")
public class RentedInformationController {

    @Autowired
    private RentedInformationService rentedInformationService;

    @PostMapping("/add")
    public ResponseEntity<String> saveRentedInformation(@RequestBody RentedInformation rentedInformation) {
        rentedInformationService.saveRentedInformation(rentedInformation);
        return ResponseEntity.ok("Rented Information Added Successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateRentedInformation(@RequestBody RentedInformation rentedInformation) {
        RentedInformation updatedRentedInformation = rentedInformationService.updateRentedInformation(rentedInformation);
        if (updatedRentedInformation != null) {
            return ResponseEntity.ok("Rented Information Updated Successfully");
        } else {
            return ResponseEntity.status(404).body("Rented Information Not Found");
        }
    }

    @GetMapping("/getAll")
    public List<RentedInformation> getAllRentedInformation(){
        return rentedInformationService.getAllRentedInformation();
    }

    @GetMapping("/get/{id}")
    public RentedInformation getRentedInformation(@PathVariable int id) {
        return rentedInformationService.getRentedInformation(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRentedInformation(@PathVariable int id) {
        boolean isDeleted = rentedInformationService.deleteRentedInformation(id);
        if (isDeleted) {
            return ResponseEntity.ok("Rented Information Deleted Successfully");
        } else {
            return ResponseEntity.status(404).body("Rented Information Not Found");
        }
    }
}
