package com.tournament.tournament_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tournament_id;

    private String name;

    @ManyToOne
    private Organisateur organisateur;

    @ManyToOne
    private Game game;

    @ManyToOne
    private Bracket brackette;


    @ManyToOne
    @JoinColumn(name = "type_tournoi_id")
    private Type_tournoi type;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "tournament_id")
    private List<Rule> rules;

    private LocalDate Datedbt;
    private LocalDate DateFin;

    @ManyToOne
    @JoinColumn(name = "winner_team_id")
    private Team Winner;  // Null until tournament is completed

     @ManyToOne
    @JoinColumn(name = "second_team_id")
    private Team secondplace;

     @ManyToOne
    @JoinColumn(name = "third_team_id")
    private Team thirdplace;




    public Integer getTournament_id() {
        return tournament_id;
    }

    public void setTournament_id(Integer tournament_id) {
        this.tournament_id = tournament_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Bracket getBrackette() {
        return brackette;
    }

    public void setBrackette(Bracket brackette) {
        this.brackette = brackette;
    }

    public Type_tournoi getType() {
        return type;
    }

    public void setType(Type_tournoi type) {
        this.type = type;
    }

    public List<Rule> getRules() {
        return rules;
    }

    public void setRules(List<Rule> rules) {
        this.rules = rules;
    }

    public LocalDate getDatedbt() {
        return Datedbt;
    }

    public void setDatedbt(LocalDate datedbt) {
        Datedbt = datedbt;
    }

    public LocalDate getDateFin() {
        return DateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        DateFin = dateFin;
    }

    public Team getWinner() {
        return Winner;
    }

    public void setWinner(Team winner) {
        Winner = winner;
    }

    public Team getSecondplace() {
        return secondplace;
    }

    public void setSecondplace(Team secondplace) {
        this.secondplace = secondplace;
    }

    public Team getThirdplace() {
        return thirdplace;
    }

    public void setThirdplace(Team thirdplace) {
        this.thirdplace = thirdplace;
    }

    public Organisateur getOrganisateur() {
        return organisateur;
    }

    public void setOrganisateur(Organisateur organisateur) {
        this.organisateur = organisateur;
    }
}
