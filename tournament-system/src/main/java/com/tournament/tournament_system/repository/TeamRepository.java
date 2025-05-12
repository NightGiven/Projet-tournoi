package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    List<Team> findByNameContainingIgnoreCase(String name);
    List<Team> findByRegion(String region);
    List<Team> findByPlayers_PlayerId(Long playerId);
}
