package com.autotravels.vehicle_management_system.controller;

import com.autotravels.vehicle_management_system.model.Vehicle;
import com.autotravels.vehicle_management_system.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/add")
    public ResponseEntity<String> saveVehicle(@RequestBody Vehicle vehicle) {
        vehicleService.saveVehicle(vehicle);
        return ResponseEntity.ok("New Vehicle is Added");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateVehicle(@RequestBody Vehicle vehicle) {
        Vehicle updatedVehicle = vehicleService.updateVehicle(vehicle);
        if (updatedVehicle != null) {
            return ResponseEntity.ok("Vehicle Updated Successfully");
        } else {
            return ResponseEntity.status(404).body("Vehicle Not Found");
        }
    }

    @GetMapping("/getAll")
    public List<Vehicle> getAllVehicles(){
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/get/{id}")
    public Vehicle getVehicle(@PathVariable int id) {
        return vehicleService.getVehicle(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable int id) {
        boolean isDeleted = vehicleService.deleteVehicle(id);
        if (isDeleted) {
            return ResponseEntity.ok("Vehicle Deleted Successfully");
        } else {
            return ResponseEntity.status(404).body("Vehicle Not Found");
        }
    }
}
