package com.example.restaurant.controllers;

import com.example.restaurant.entities.Client;
import com.example.restaurant.entities.Commande;
import com.example.restaurant.entities.EtatCommande;
import com.example.restaurant.entities.MenuQuantite;
import com.example.restaurant.services.CommandeService;
import com.example.restaurant.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/commandes")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    @Autowired
    private ClientService clientService;

    @PostMapping("/passer")
    public ResponseEntity<Commande> passerCommande(
            @RequestParam Long clientId,
            @RequestBody List<MenuQuantite> menusQuantites) {
        Client client = clientService.getClientById(clientId);
        if (client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Commande commande = commandeService.passerCommande(client, menusQuantites);
        return ResponseEntity.status(HttpStatus.CREATED).body(commande);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Commande>> listerCommandes(@PathVariable Long clientId) {
        List<Commande> commandes = commandeService.getCommandesParClient(clientId);
        if (commandes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(commandes);
    }

    @PutMapping("/modifier/{commandeId}")
    public ResponseEntity<Commande> modifierCommande(
            @PathVariable Long commandeId,
            @RequestBody List<MenuQuantite> menusQuantites) {
        Commande commande = commandeService.modifierCommande(commandeId, menusQuantites);
        if (commande == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(commande);
    }

  /*  @DeleteMapping("/supprimer/{commandeId}")
    public ResponseEntity<Void> supprimerCommande(@PathVariable Long commandeId) {
        commandeService.supprimerCommande(commandeId);
        return ResponseEntity.noContent().build();
    }*/


    @GetMapping("/{commandeId}")
    public ResponseEntity<Commande> getCommandeById(@PathVariable Long commandeId) {
        Commande commande = commandeService.getCommandeById(commandeId);
        if (commande == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(commande);
    }



    @DeleteMapping("/supprimer/{commandeId}")
    public ResponseEntity<String> supprimerCommande(@PathVariable Long commandeId) {
        // Récupérer la commande
        Commande commande = commandeService.trouverCommandeParId(commandeId);

        if (commande == null) {
            return ResponseEntity.notFound().build();
        }

        // Vérifier l'état de la commande
        if (!commande.getEtatCommande().equals(EtatCommande.EN_ATTENTE)) {
            return ResponseEntity.badRequest().body("La commande ne peut être supprimée que si elle est en attente.");
        }

        // Supprimer la commande
        commandeService.supprimerCommande(commandeId);

        return ResponseEntity.noContent().build();
    }














}
