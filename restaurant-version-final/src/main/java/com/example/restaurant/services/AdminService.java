package com.example.restaurant.services;

import com.example.restaurant.entities.Admin;
import com.example.restaurant.entities.Categorie;
import com.example.restaurant.entities.Commande;
import com.example.restaurant.entities.Menu;
import com.example.restaurant.repositories.AdminRepository;
import com.example.restaurant.repositories.CategorieRepository;
import com.example.restaurant.repositories.CommandeRepository;
import com.example.restaurant.repositories.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Service
public class AdminService {


    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private CategorieRepository categorieRepository;



    public Optional<Admin> authenticate(String nom, String email) {
        return adminRepository.findByNomAndEmail(nom, email); // Méthode qui recuper nom et email du candidat
    }


    // Gestion des menus
    public Menu addMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu updateMenu(Long id, Menu updatedMenu) {
        Menu existingMenu = menuRepository.findById(id).orElseThrow(() -> new RuntimeException("Menu not found"));
        existingMenu.setNom(updatedMenu.getNom());
        existingMenu.setPrix(updatedMenu.getPrix());
        existingMenu.setDescription(updatedMenu.getDescription());
        existingMenu.setImageURL(updatedMenu.getImageURL());
        existingMenu.setCategorie(updatedMenu.getCategorie());
        return menuRepository.save(existingMenu);
    }

    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }
    // Gestion des commandes
    public List<Commande> getCommandesEnAttente() {
        return commandeRepository.findCommandesEnAttente();
    }


    public List<Commande> getCommandesTerminees() {
        return commandeRepository.findCommandesTerminees();
    }

    public Double getRevenuQuotidien(LocalDate date) {
        return commandeRepository.calculateRevenuQuotidien(date);
    }

    public Double getRevenuHebdomadaire(LocalDate date) {
        return commandeRepository.calculateRevenuHebdomadaire(date);
    }

    public Double getRevenuMensuel(LocalDate date) {
        return commandeRepository.calculateRevenuMensuel(date);
    }

    //Le plat le plus Vendu
    public Menu getPlatLePlusVendu() {
        return menuRepository.findPlatLePlusVendu(); // Supposez que cette méthode existe dans votre repository.
    }

    //Les revenus selon les catégories
    public List<Object[]> getRevenusParCategorie() {
        return menuRepository.findRevenusParCategorie();
    }




    //Notifications pour les commandes non livrées depuis un certain temps
    public List<Commande> getCommandesNonLivreesDepuis(Long dureeEnHeures) {
        LocalDateTime limite = LocalDateTime.now().minusHours(dureeEnHeures);
        return commandeRepository.findCommandesNonLivreesDepuis(limite);
    }

   //les statistiques des commandes en temps réel
    public Map<String, Object> getTableauDeBord() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("commandesEnAttente", commandeRepository.countCommandesEnAttente());
        stats.put("commandesTerminees", commandeRepository.countCommandesTerminees());
        stats.put("revenuQuotidien", getRevenuQuotidien(LocalDate.now()));
        stats.put("revenuHebdomadaire", getRevenuHebdomadaire(LocalDate.now()));
        stats.put("revenuMensuel", getRevenuMensuel(LocalDate.now()));
        stats.put("platLePlusVendu", getPlatLePlusVendu());
        return stats;
    }




    //***************************** Partie Catégories *******************************



    // Ajouter une catégorie
    public Categorie addCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    // Modifier une catégorie
    public Categorie updateCategorie(Long id, Categorie updatedCategorie) {
        Categorie existingCategorie = categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catégorie non trouvée"));
        existingCategorie.setNom(updatedCategorie.getNom());
        return categorieRepository.save(existingCategorie);
    }

    // Supprimer une catégorie
    public void deleteCategorie(Long id) {
        if (!categorieRepository.existsById(id)) {
            throw new RuntimeException("Catégorie non trouvée");
        }
        categorieRepository.deleteById(id);
    }

    // Lister toutes les catégories
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }


    // Lister toutes les catégories
    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }


}
