package com.example.restaurant.repositories;

import com.example.restaurant.entities.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    @Query("SELECT c FROM Commande c WHERE c.etatCommande = 'EN_ATTENTE'")
    List<Commande> findCommandesEnAttente();

    @Query("SELECT SUM(c.prixTotal) FROM Commande c WHERE DATE(c.dateCommande) = ?1")
    Double calculateRevenuQuotidien(LocalDate date);

    @Query("SELECT SUM(c.prixTotal) FROM Commande c WHERE WEEK(c.dateCommande) = WEEK(?1)")
    Double calculateRevenuHebdomadaire(LocalDate date);

    @Query("SELECT SUM(c.prixTotal) FROM Commande c WHERE MONTH(c.dateCommande) = MONTH(?1)")
    Double calculateRevenuMensuel(LocalDate date);



    @Query("SELECT c FROM Commande c WHERE c.etatCommande = 'LIVREE'")
    List<Commande> findCommandesTerminees();


    @Query("SELECT c FROM Commande c WHERE c.etatCommande = 'EN_ATTENTE' AND c.dateCommande <= :limite")
    List<Commande> findCommandesNonLivreesDepuis(@Param("limite") LocalDateTime limite);


    //les statistiques des commandes en temps réel
    @Query("SELECT COUNT(c) FROM Commande c WHERE c.etatCommande = 'EN_ATTENTE'")
    Long countCommandesEnAttente();

    @Query("SELECT COUNT(c) FROM Commande c WHERE c.etatCommande = 'LIVRE'")
    Long countCommandesTerminees();


    List<Commande> findByClientId(Long clientId);


}
