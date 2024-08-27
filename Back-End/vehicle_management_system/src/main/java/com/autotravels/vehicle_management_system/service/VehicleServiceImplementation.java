package com.autotravels.vehicle_management_system.service;

import com.autotravels.vehicle_management_system.model.Vehicle;
import com.autotravels.vehicle_management_system.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleServiceImplementation implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public void saveVehicle(Vehicle vehicle) {
        vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updateVehicle(Vehicle vehicle) {
        Optional<Vehicle> existingVehicle = vehicleRepository.findById(vehicle.getId());
        if (existingVehicle.isPresent()) {
            Vehicle updatedVehicle = existingVehicle.get();
            updatedVehicle.setBrand(vehicle.getBrand());
            updatedVehicle.setModel(vehicle.getModel());
            updatedVehicle.setYear(vehicle.getYear());
            updatedVehicle.setVehicleNumber(vehicle.getVehicleNumber());
            updatedVehicle.setMillage(vehicle.getMillage());
            updatedVehicle.setRentalStatus(vehicle.isRentalStatus());
            updatedVehicle.setPhoto(vehicle.getPhoto());

            return vehicleRepository.save(updatedVehicle);
        } else {
            return null;
        }
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Override
    public Vehicle getVehicle(int id) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        return vehicle.orElse(null);
    }

    @Override
    public boolean deleteVehicle(int id) {
        Optional<Vehicle> existingVehicle = vehicleRepository.findById(id);
        if (existingVehicle.isPresent()) {
            vehicleRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
