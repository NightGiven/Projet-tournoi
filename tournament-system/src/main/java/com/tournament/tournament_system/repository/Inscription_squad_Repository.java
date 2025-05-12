package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Inscription_squad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface Inscription_squad_Repository extends JpaRepository<Inscription_squad, Integer> {
    List<Inscription_squad> findByTournamentId(Integer tournamentId);
    List<Inscription_squad> findByTeamId(Integer teamId);
    List<Inscription_squad> findByDateInscriptionBetween(LocalDateTime start, LocalDateTime end);
    boolean existsByTournamentIdAndTeamId(Integer tournamentId, Integer teamId);

}
