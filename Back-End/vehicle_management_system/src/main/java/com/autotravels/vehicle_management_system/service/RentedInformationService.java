package com.autotravels.vehicle_management_system.service;

import com.autotravels.vehicle_management_system.model.RentedInformation;
import com.autotravels.vehicle_management_system.model.Vehicle;

import java.util.List;

public interface RentedInformationService {
    public void saveRentedInformation(RentedInformation rentedInformation);
    public RentedInformation updateRentedInformation(RentedInformation rentedInformation);

    public List<RentedInformation> getAllRentedInformation();

    public RentedInformation getRentedInformation(int id);

    public boolean deleteRentedInformation(int id);
}
