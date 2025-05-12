package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Player;
import com.tournament.tournament_system.entity.Type_tournoi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeRepository extends JpaRepository<Type_tournoi, Integer> {
}

