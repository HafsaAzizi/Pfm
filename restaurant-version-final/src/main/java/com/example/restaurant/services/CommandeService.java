package com.example.restaurant.services;

import com.example.restaurant.entities.*;
import com.example.restaurant.repositories.CommandeRepository;
import com.example.restaurant.repositories.ClientRepository;
import com.example.restaurant.repositories.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private MenuRepository menuRepository;

    public Commande passerCommande(Client client, List<MenuQuantite> menusQuantites) {
        Commande commande = new Commande();
        commande.setClient(client);
        commande.setDateCommande(LocalDateTime.now());
        commande.setEtatCommande(EtatCommande.EN_ATTENTE);

        for (MenuQuantite menuQuantite : menusQuantites) {
            Menu menu = menuRepository.findById(menuQuantite.getMenu().getId())
                    .orElseThrow(() -> new RuntimeException("Menu not found"));
            commande.ajouterMenu(menu, menuQuantite.getQuantite());
        }

        commande.calculerPrixTotal();
        return commandeRepository.save(commande);
    }

    public List<Commande> getCommandesParClient(Long clientId) {
        return commandeRepository.findByClientId(clientId);
    }

    public Commande modifierCommande(Long commandeId, List<MenuQuantite> menusQuantites) {
        Optional<Commande> commandeOpt = commandeRepository.findById(commandeId);
        if (commandeOpt.isPresent()) {
            Commande commande = commandeOpt.get();
            commande.getMenus().clear(); // Clear existing menus
            for (MenuQuantite menuQuantite : menusQuantites) {
                Menu menu = menuRepository.findById(menuQuantite.getMenu().getId())
                        .orElseThrow(() -> new RuntimeException("Menu not found"));
                commande.ajouterMenu(menu, menuQuantite.getQuantite());
            }
            commande.calculerPrixTotal();
            return commandeRepository.save(commande);
        }
        return null;
    }


    public Commande getCommandeById(Long commandeId) {
        return commandeRepository.findById(commandeId).orElse(null);
    }


    public Commande changerEtatCommande(Long commandeId, EtatCommande nouvelEtat) {
        return commandeRepository.findById(commandeId)
                .map(commande -> {
                    commande.setEtatCommande(nouvelEtat);
                    return commandeRepository.save(commande);
                })
                .orElse(null);
    }

    public void supprimerCommande(Long commandeId) {
        commandeRepository.deleteById(commandeId);
    }



    // Méthode pour trouver une commande par ID
    public Commande trouverCommandeParId(Long commandeId) {
        return commandeRepository.findById(commandeId).orElse(null);
    }

    // Méthode pour supprimer une commande
  /*  public void supprimerCommande(Long id) {
        commandeRepository.deleteById(id);
    }*/



}
