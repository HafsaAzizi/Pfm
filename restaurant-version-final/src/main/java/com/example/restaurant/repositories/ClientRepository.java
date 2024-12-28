package com.example.restaurant.repositories;

import com.example.restaurant.entities.Admin;
import com.example.restaurant.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByEmail(String email);
  ///  Optional<Client> findByPasswordAndEmail(String email, String password);


}