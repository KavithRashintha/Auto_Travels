package com.autotravels.vehicle_management_system.service;

import com.autotravels.vehicle_management_system.model.RentedInformation;

import java.util.List;
import java.util.Map;

public interface RentedInformationService {
    public void saveRentedInformation(RentedInformation rentedInformation);
    public RentedInformation updateRentedInformation(RentedInformation rentedInformation);

    public List<RentedInformation> getAllRentedInformation();

    public RentedInformation getRentedInformation(int id);

    List<List<Map<String, Object>>> getAllRentedInformationWithStatus();

    public boolean deleteRentedInformation(int id);
}
