package com.autotravels.vehicle_management_system.repository;

import com.autotravels.vehicle_management_system.model.RentedInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentedInformationRepository extends JpaRepository<RentedInformation,Integer> {

}
