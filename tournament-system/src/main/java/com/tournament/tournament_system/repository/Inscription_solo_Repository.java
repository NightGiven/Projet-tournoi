package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Inscription_solo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface Inscription_solo_Repository extends JpaRepository<Inscription_solo, Integer> {
    List<Inscription_solo> findByTournamentId(Long tournamentId);
    List<Inscription_solo> findByPlayerId(Long playerId);
    List<Inscription_solo> findByDateInscriptionBetween(LocalDateTime start, LocalDateTime end);
}