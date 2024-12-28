package com.example.restaurant.repositories;



import com.example.restaurant.entities.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    // Trouver le plat le plus vendu
    @Query(value = "SELECT m.* " +
            "FROM commande_menus cm " +
            "JOIN menu m ON cm.menu_id = m.id " +
            "GROUP BY m.id " +
            "ORDER BY SUM(cm.quantite) DESC " +
            "LIMIT 1", nativeQuery = true)
    Menu findPlatLePlusVendu();


    // Calculer les revenus par catégorie
    @Query("SELECT m.categorie.nom, SUM(mq.quantite * m.prix) AS revenus " +
            "FROM Commande c JOIN c.menus mq JOIN mq.menu m " +
            "GROUP BY m.categorie.nom")
    List<Object[]> findRevenusParCategorie();


}
