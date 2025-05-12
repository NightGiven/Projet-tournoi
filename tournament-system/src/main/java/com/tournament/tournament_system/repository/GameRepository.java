package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Game;
import com.tournament.tournament_system.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Integer> {
}

