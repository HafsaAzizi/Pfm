package com.example.restaurant.repositories;


import com.example.restaurant.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;



@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByNomAndEmail(String nom, String email);

}