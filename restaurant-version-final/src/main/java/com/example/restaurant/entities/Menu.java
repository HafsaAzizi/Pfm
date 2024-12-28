package com.example.restaurant.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;

@Entity
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    @Column(nullable = false)
    private Double prix = 0.0;

    private String description;
    private String imageURL;

    // Un menu dépend d'une seule catégorie
    @ManyToOne
    @JoinColumn(name = "categorie_id")
    private Categorie categorie;

    // Constructeurs, getters et setters
    public Menu() {
        this.prix = 0.0;
    }

  /*  public Menu(String nom, Double prix, String description, String imageURL, Categorie categorie) {
        this.nom = nom;
        this.prix = prix;
        this.description = description;
        this.imageURL = imageURL;
        this.categorie = categorie;
    }*/

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Double getPrix() {
        return prix != null ? prix : 0.0; // Ensure we never return null
    }

    public void setPrix(Double prix) {
        this.prix = prix != null ? prix : 0.0; // Ensure we never set null
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }
}