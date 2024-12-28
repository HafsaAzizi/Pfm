package com.example.restaurant.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nom est obligatoire")
    private String nom;

   // @NotBlank(message = "Email est obligatoire")
    private String email;

    @NotBlank(message = "Adresse est obligatoire")
    private String adresse;

    @NotBlank(message = "Numéro de téléphone est obligatoire")
    private String numTelephone;

   // @NotBlank(message = "password est obligatoire")
    private String password;


// Un client peut passer plusieurs commandes
  /*  @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Commande> commandes;*/

    // Constructeurs, getters et setters
    public Client() {
    }

    public Client(String nom, String email, String adresse, String numTelephone) {
        this.nom = nom;
        this.email = email;
        this.adresse = adresse;
        this.numTelephone = numTelephone;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword( String password) {
        this.password = password;
    }
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNumTelephone() {
        return numTelephone;
    }

    public void setNumTelephone(String numTelephone) {
        this.numTelephone = numTelephone;
    }

 /*   public List<Commande> getCommandes() {
        return commandes;
    }

    public void setCommandes(List<Commande> commandes) {
        this.commandes = commandes;
    }*/
}