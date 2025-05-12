package com.tournament.tournament_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inscription_squad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer insc_squad_id;

    @ManyToOne
    private Tournament tournoi;

    @ManyToOne
    private Team team;
    private LocalDate registeredAt;

    public Integer getInsc_squad_id() {
        return insc_squad_id;
    }

    public void setInsc_squad_id(Integer insc_squad_id) {
        this.insc_squad_id = insc_squad_id;
    }

    public Tournament getTournoi() {
        return tournoi;
    }

    public void setTournoi(Tournament tournoi) {
        this.tournoi = tournoi;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public LocalDate getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = LocalDate.from(registeredAt);
    }
}