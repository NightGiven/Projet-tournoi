package com.tournament.tournament_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer game_id;

    
    private String nom;
    private String Developpeur ;

    public Game(String nom, String developpeur) {
        this.nom = nom;
        Developpeur = developpeur;
    }

    public Integer getGame_id() {
        return game_id;
    }

    public String getNom() {
        return nom;
    }

    public String getDeveloppeur() {
        return Developpeur;
    }

    public void setGame_id(Integer game_id) {
        this.game_id = game_id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setDeveloppeur(String developpeur) {
        Developpeur = developpeur;
    }
}