package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TournamentRepository extends JpaRepository<Tournament, Integer> {
    List<Tournament> findByNomContainingIgnoreCase(String nom);
    List<Tournament> findByDateDebutBetween(LocalDateTime start, LocalDateTime end);
    List<Tournament> findByGameId(Long gameId);
    List<Tournament> findByOrganisateurId(Long organisateurId);
}
