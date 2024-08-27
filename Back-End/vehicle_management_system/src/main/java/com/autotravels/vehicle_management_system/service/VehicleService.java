package com.autotravels.vehicle_management_system.service;

import com.autotravels.vehicle_management_system.model.Vehicle;

import java.util.List;

public interface VehicleService {
    public void saveVehicle(Vehicle vehicle);

    public Vehicle updateVehicle(Vehicle vehicle);

    public List<Vehicle> getAllVehicles();

    public Vehicle getVehicle(int id);

    public List<Vehicle> getAvailableVehicles();

    public boolean deleteVehicle(int id);
}
