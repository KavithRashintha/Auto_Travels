package com.autotravels.vehicle_management_system.repository;

import com.autotravels.vehicle_management_system.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle,Integer> {
    List<Vehicle> findByRentalStatusFalse();
}
