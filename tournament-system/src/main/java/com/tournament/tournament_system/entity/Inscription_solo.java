package com.tournament.tournament_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inscription_solo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer insc_solo_id;

    @ManyToOne
    private Tournament tournoi;

    @ManyToOne
    private Player joueur;
    private LocalDate registeredAt;


    public Integer getInsc_solo_id() {
        return insc_solo_id;
    }

    public void setInsc_solo_id(Integer insc_solo_id) {
        this.insc_solo_id = insc_solo_id;
    }

    public Tournament getTournoi() {
        return tournoi;
    }

    public void setTournoi(Tournament tournoi) {
        this.tournoi = tournoi;
    }

    public Player getJoueur() {
        return joueur;
    }

    public void setJoueur(Player joueur) {
        this.joueur = joueur;
    }

    public LocalDate getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(LocalDate registeredAt) {
        this.registeredAt = registeredAt;
    }
}
