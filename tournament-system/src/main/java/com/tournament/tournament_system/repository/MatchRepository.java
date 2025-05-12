package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Integer> {
    List<Match> findByBracketId(Long bracketId);
    List<Match> findByTeam1IdOrTeam2Id(Long teamId, Long teamId2);
    List<Match> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Match> findByStatus(String status);

}
