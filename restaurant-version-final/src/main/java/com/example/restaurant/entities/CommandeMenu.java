/*package com.example.restaurant.entities;

import jakarta.persistence.*;


@Entity
public class CommandeMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commande_id", nullable = false)
    private Commande commande;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", nullable = false)
    private Menu menu;

    private int quantite;

    // Default constructor
    public CommandeMenu() {
    }

    // Constructor with all fields
    public CommandeMenu(Commande commande, Menu menu, int quantite) {
        this.commande = commande;
        this.menu = menu;
        this.quantite = quantite;
    }

    // Getters and setters with null checks
    public void setCommande(Commande commande) {
        if (commande == null) {
            throw new IllegalArgumentException("Commande cannot be null");
        }
        this.commande = commande;
    }

    public void setMenu(Menu menu) {
        if (menu == null) {
            throw new IllegalArgumentException("Menu cannot be null");
        }
        this.menu = menu;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Commande getCommande() {
        return commande;
    }


}*/

