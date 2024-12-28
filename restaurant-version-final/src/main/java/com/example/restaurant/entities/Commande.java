package com.example.restaurant.entities;

import jakarta.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relation avec le client
    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @NotNull
    private LocalDateTime dateCommande;

    @Enumerated(EnumType.STRING)
    private EtatCommande etatCommande = EtatCommande.EN_ATTENTE;

    private Double prixTotal = 0.0;

    // Liste des menus avec quantités
    @ElementCollection
    @CollectionTable(name = "commande_menus", joinColumns = @JoinColumn(name = "commande_id"))
    private List<MenuQuantite> menus = new ArrayList<>();

    // Constructeur par défaut
    public Commande() {
        this.dateCommande = LocalDateTime.now();
    }

    // Méthode pour calculer le prix total
    public void calculerPrixTotal() {
        this.prixTotal = menus.stream()
                .mapToDouble(menuQuantite -> menuQuantite.getMenu().getPrix() * menuQuantite.getQuantite())
                .sum();
    }

    // Ajouter un menu à la commande
    public void ajouterMenu(Menu menu, int quantite) {
        MenuQuantite existingMenuQuantite = menus.stream()
                .filter(mq -> mq.getMenu().equals(menu))
                .findFirst()
                .orElse(null);

        if (existingMenuQuantite != null) {
            existingMenuQuantite.setQuantite(existingMenuQuantite.getQuantite() + quantite);
        } else {
            menus.add(new MenuQuantite(menu, quantite));
        }
        calculerPrixTotal();
    }

    // Supprimer un menu de la commande
    public void supprimerMenu(Menu menu) {
        menus.removeIf(menuQuantite -> menuQuantite.getMenu().equals(menu));
        calculerPrixTotal();
    }

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public LocalDateTime getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(LocalDateTime dateCommande) {
        this.dateCommande = dateCommande;
    }

    public EtatCommande getEtatCommande() {
        return etatCommande;
    }

    public void setEtatCommande(EtatCommande etatCommande) {
        this.etatCommande = etatCommande;
    }

    public Double getPrixTotal() {
        return prixTotal;
    }

    public void setPrixTotal(Double prixTotal) {
        this.prixTotal = prixTotal;
    }

    public List<MenuQuantite> getMenus() {
        return menus;
    }

    public void setMenus(List<MenuQuantite> menus) {
        this.menus = menus;
    }
}
/*
@Embeddable
 class MenuQuantite {

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
}*/
