package com.example.restaurant.controllers;

import com.example.restaurant.entities.Admin;
import com.example.restaurant.entities.Client;
import com.example.restaurant.entities.Commande;
import com.example.restaurant.repositories.ClientRepository;
import com.example.restaurant.services.ClientService;
import com.example.restaurant.services.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CommandeService commandeService;

    // 1. Enregistrer un nouveau client (Inscription)
    @PostMapping("/register")
    public ResponseEntity<Client> registerClient(@RequestBody Client client) {
        Client savedClient = clientService.saveClient(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedClient);
    }

    // 2. Authentifier un client (Connexion)
   @PostMapping("/login")
    public ResponseEntity<Client> authenticateClient(@RequestParam String email) {
        Client authenticatedClient = clientService.authenticate(email);
        if (authenticatedClient != null) {
            return ResponseEntity.ok(authenticatedClient);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


 /*   @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Client client) {
        try {
            Client authenticatedClient = clientRepository.findByEmail(client.getEmail())
                    .filter(c -> c.getPassword().equals(client.getPassword()))
                    .orElse(null);

            if (authenticatedClient != null) {
                // Don't send password in response
                authenticatedClient.setPassword(null);
                return ResponseEntity.ok(authenticatedClient);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Email ou mot de passe incorrect");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Une erreur est survenue lors de la connexion");
        }
    }*/
    // 3. Récupérer les informations d'un client par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        Client client = clientService.findById(id);
        if (client != null) {
            return ResponseEntity.ok(client);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // 4. Modifier un client (Exemple : modifier le nom ou l'email)
    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client clientDetails) {
        Client updatedClient = clientService.updateClient(id, clientDetails);
        if (updatedClient != null) {
            return ResponseEntity.ok(updatedClient);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // 5. Supprimer un client par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        boolean isDeleted = clientService.deleteClient(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // 6. Récupérer toutes les commandes passées par un client
    @GetMapping("/{id}/commandes")
    public ResponseEntity<List<Commande>> getClientCommandes(@PathVariable Long id) {
        List<Commande> commandes = commandeService.getCommandesParClient(id);
        if (commandes != null && !commandes.isEmpty()) {
            return ResponseEntity.ok(commandes);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // 7. Passer une nouvelle commande pour un client



}
