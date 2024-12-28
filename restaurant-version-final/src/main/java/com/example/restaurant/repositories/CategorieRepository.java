package com.example.restaurant.repositories;

import com.example.restaurant.entities.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Long> {
    // Ajoutez des méthodes spécifiques si nécessaire
}