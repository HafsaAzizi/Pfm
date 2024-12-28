package com.example.restaurant.services;

import com.example.restaurant.entities.Client;
import com.example.restaurant.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    // Trouver un client par son ID
    public Client getClientById(Long clientId) {
        return clientRepository.findById(clientId).orElse(null);
    }

    // Enregistrer un nouveau client
    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    // Authentifier un client
    public Client authenticate(String email) {
        return clientRepository.findByEmail(email)
                .orElse(null); // Retourne null si aucune correspondance
    }

    // Récupérer un client par ID
    public Client findById(Long id) {
        return clientRepository.findById(id).orElse(null);
    }

    // Modifier les informations d'un client
    public Client updateClient(Long id, Client clientDetails) {
        Optional<Client> clientOpt = clientRepository.findById(id);
        if (clientOpt.isPresent()) {
            Client client = clientOpt.get();
            client.setNom(clientDetails.getNom());
            client.setEmail(clientDetails.getEmail());
            return clientRepository.save(client);
        }
        return null;
    }

    // Supprimer un client par ID
    public boolean deleteClient(Long id) {
        if (clientRepository.existsById(id)) {
            clientRepository.deleteById(id);
            return true;
        }
        return false;
    }
}


