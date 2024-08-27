package com.autotravels.vehicle_management_system.service;

import com.autotravels.vehicle_management_system.model.RentedInformation;
import com.autotravels.vehicle_management_system.model.Vehicle;
import com.autotravels.vehicle_management_system.repository.RentedInformationRepository;
import com.autotravels.vehicle_management_system.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RentedInformationServiceImplementation implements RentedInformationService {

    @Autowired
    private RentedInformationRepository rentedInformationRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public void saveRentedInformation(RentedInformation rentedInformation) {
        rentedInformationRepository.save(rentedInformation);
    }

    @Override
    public RentedInformation updateRentedInformation(RentedInformation rentedInformation) {
        Optional<RentedInformation> existingRentedInformation = rentedInformationRepository.findById(rentedInformation.getId());
        if (existingRentedInformation.isPresent()) {
            RentedInformation updatedRentedInformation = existingRentedInformation.get();
            updatedRentedInformation.setRentedPerson(rentedInformation.getRentedPerson());
            updatedRentedInformation.setNIC(rentedInformation.getNIC());
            updatedRentedInformation.setAddress(rentedInformation.getAddress());
            updatedRentedInformation.setMobile(rentedInformation.getMobile());
            updatedRentedInformation.setVehicleId(rentedInformation.getVehicleId());

            return rentedInformationRepository.save(updatedRentedInformation);
        } else {
            return null;
        }
    }

    @Override
    public List<RentedInformation> getAllRentedInformation() {
        return rentedInformationRepository.findAll();
    }

    @Override
    public RentedInformation getRentedInformation(int id) {
        Optional<RentedInformation> rentedInformation = rentedInformationRepository.findById(id);
        return rentedInformation.orElse(null);
    }

    @Override
    public List<List<Map<String, Object>>> getAllRentedInformationWithStatus() {
        List<RentedInformation> rentedInfoList = rentedInformationRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (RentedInformation rentedInfo : rentedInfoList) {
            Optional<Vehicle> vehicleOpt = vehicleRepository.findById(rentedInfo.getVehicleId());

            if (vehicleOpt.isPresent()) {
                Vehicle vehicle = vehicleOpt.get();
                Map<String, Object> rentedInfoWithStatus = new HashMap<>();
                rentedInfoWithStatus.put("id", rentedInfo.getId());
                rentedInfoWithStatus.put("rentedPerson", rentedInfo.getRentedPerson());
                rentedInfoWithStatus.put("NIC", rentedInfo.getNIC());
                rentedInfoWithStatus.put("address", rentedInfo.getAddress());
                rentedInfoWithStatus.put("mobile", rentedInfo.getMobile());
                rentedInfoWithStatus.put("vehicleId", rentedInfo.getVehicleId());
                rentedInfoWithStatus.put("rentalStatus", vehicle.isRentalStatus() ? "Rented" : "Available");
                result.add(rentedInfoWithStatus);
            }
        }
        return Collections.singletonList(result);
    }

    @Override
    public boolean deleteRentedInformation(int id) {
        Optional<RentedInformation> existingRentedInformation = rentedInformationRepository.findById(id);
        if (existingRentedInformation.isPresent()) {
            rentedInformationRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
