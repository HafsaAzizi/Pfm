package com.example.restaurant.entities;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class MenuQuantite {

    @ManyToOne
    @JoinColumn(name = "menu_id", nullable = false)
    private Menu menu;

    private int quantite;

    // Constructeur
    public MenuQuantite(Menu menu, int quantite) {
        this.menu = menu;
        this.quantite = quantite;
    }

    public MenuQuantite() {}

    // Getters et setters
    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}