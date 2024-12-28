package com.example.restaurant.controllers;

import com.example.restaurant.entities.*;
import com.example.restaurant.repositories.MenuRepository;
import com.example.restaurant.services.AdminService;
import com.example.restaurant.services.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private MenuRepository menuRepository;

    //Connexion du l'admin
    @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody Admin admin) {
        return adminService.authenticate(admin.getNom(), admin.getEmail())
                .map(authenticatedAdmin -> ResponseEntity.ok("Connexion réussie"))
                .orElse(ResponseEntity.status(401).body("Nom ou email invalide"));
    }


    // Gestion des menus
    @PostMapping("/menus")
    public ResponseEntity<Menu> addMenu(@RequestBody Menu menu) {
        return ResponseEntity.ok(adminService.addMenu(menu));
    }

    @GetMapping("/menus")
    public ResponseEntity<List<Menu>> getAllMenus() {
        return ResponseEntity.ok(adminService.getAllMenus());
    }

    @PutMapping("/menus/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long id, @RequestBody Menu menu) {
        return ResponseEntity.ok(adminService.updateMenu(id, menu));
    }

    @DeleteMapping("/menus/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        adminService.deleteMenu(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Long id) {
        return menuRepository.findById(id)
                .map(menu -> ResponseEntity.ok().body(menu))
                .orElse(ResponseEntity.notFound().build());
    }

    // ***************************************Gestion des commandes***************************

    // Endpoint pour visualiser les commandes terminées et en attentes
    @GetMapping("/commandes/en-attente")
    public ResponseEntity<List<Commande>> getCommandesEnAttente() {
        return ResponseEntity.ok(adminService.getCommandesEnAttente());
    }

    @GetMapping("/commandes-terminees")
    public ResponseEntity<List<Commande>> getCommandesTerminees() {
        return ResponseEntity.ok(adminService.getCommandesTerminees());
    }

    @GetMapping("/revenu/quotidien")
    public ResponseEntity<Double> getRevenuQuotidien() {
        return ResponseEntity.ok(adminService.getRevenuQuotidien(LocalDate.now()));
    }

    @GetMapping("/revenu/hebdomadaire")
    public ResponseEntity<Double> getRevenuHebdomadaire() {
        return ResponseEntity.ok(adminService.getRevenuHebdomadaire(LocalDate.now()));
    }

    @GetMapping("/revenu/mensuel")
    public ResponseEntity<Double> getRevenuMensuel() {
        return ResponseEntity.ok(adminService.getRevenuMensuel(LocalDate.now()));
    }



    // Endpoint pour obtenir le plat le plus vendu
    @GetMapping("/plat-plus-vendu")
    public ResponseEntity<Menu> getPlatLePlusVendu() {
        return ResponseEntity.ok(adminService.getPlatLePlusVendu());
    }

    // Endpoint pour obtenir les revenus par catégorie
    @GetMapping("/revenus-par-categorie")
    public ResponseEntity<List<Object[]>> getRevenusParCategorie() {
        return ResponseEntity.ok(adminService.getRevenusParCategorie());
    }

    //Notification pour les commandes non livrée
    @GetMapping("/commandes-non-livrees")
    public ResponseEntity<List<Commande>> getCommandesNonLivreesDepuis(@RequestParam Long dureeEnHeures) {
        return ResponseEntity.ok(adminService.getCommandesNonLivreesDepuis(dureeEnHeures));
    }

    //les statistiques des commandes en temps réel
    @GetMapping("/tableau-de-bord")
    public ResponseEntity<Map<String, Object>> getTableauDeBord() {
        return ResponseEntity.ok(adminService.getTableauDeBord());
    }





    // ***********************************Gestion des catégories*****************************
    @PostMapping("/categories")
    public ResponseEntity<Categorie> addCategorie(@RequestBody Categorie categorie) {
        return ResponseEntity.ok(adminService.addCategorie(categorie));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Categorie> updateCategorie(@PathVariable Long id, @RequestBody Categorie categorie) {
        return ResponseEntity.ok(adminService.updateCategorie(id, categorie));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategorie(@PathVariable Long id) {
        adminService.deleteCategorie(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Categorie>> getAllCategories() {
        return ResponseEntity.ok(adminService.getAllCategories());
    }




    /*     Changement de l'état des commandes    */

    @Autowired
    private CommandeService commandeService;

    /**
     * Changer l'état d'une commande (réservé à l'administrateur).
     */

    @PatchMapping("/changerEtat/{commandeId}")
    public ResponseEntity<Commande> changerEtatCommande(
            @PathVariable Long commandeId,
            @RequestParam(required = false, defaultValue = "EN_ATTENTE") String nouvelEtats) {
        try {
            EtatCommande nouvelEtat = EtatCommande.valueOf(nouvelEtats);
            Commande commande = commandeService.changerEtatCommande(commandeId, nouvelEtat);
            if (commande == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(commande);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    // ... autres méthodes ...

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            String uploadPath = Paths.get(uploadDir, "menus").toString();

            // Créer le répertoire s'il n'existe pas
            Files.createDirectories(Paths.get(uploadPath));

            // Générer un nom de fichier unique
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
            Path path = Paths.get(uploadPath, uniqueFileName);

            // Copier le fichier
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            // Construire l'URL de l'image
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/menus/")
                    .path(uniqueFileName)
                    .toUriString();

            Map<String, String> response = new HashMap<>();
            response.put("imageUrl", imageUrl);

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
