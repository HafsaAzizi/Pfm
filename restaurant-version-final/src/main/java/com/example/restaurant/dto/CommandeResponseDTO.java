/*package com.example.restaurant.dto;

import com.example.restaurant.entities.Commande;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class CommandeResponseDTO {

    private Long id;
    private LocalDateTime dateCommande;
    private String etatCommande;
    private Double prixTotal;
    private List<CommandeMenuDTO> items;

    // Constructor
    public CommandeResponseDTO(Commande commande) {
        this.id = commande.getId();
        this.dateCommande = commande.getDateCommande();
        this.etatCommande = commande.getEtatCommande().toString();
        this.prixTotal = commande.getPrixTotal();
        this.items = commande.getCommandeMenus().stream()
                .map(cm -> new CommandeMenuDTO(cm))
                .collect(Collectors.toList());
    }



}*/
