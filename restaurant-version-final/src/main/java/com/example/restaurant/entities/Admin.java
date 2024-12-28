package com.example.restaurant.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import javax.validation.constraints.NotBlank;

@Entity
public class Admin {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Nom is mandatory")

    private String nom;

    @NotBlank(message = "Email is mandatory")
    private String email;

    public Admin() {
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public  String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
