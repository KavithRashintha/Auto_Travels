package com.autotravels.vehicle_management_system.service;

import com.autotravels.vehicle_management_system.model.RentedInformation;
import com.autotravels.vehicle_management_system.repository.RentedInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentedInformationServiceImplementation implements RentedInformationService {

    @Autowired
    private RentedInformationRepository rentedInformationRepository;

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
