package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Player;
import com.tournament.tournament_system.entity.Rule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RuleRepository extends JpaRepository<Rule, Integer> {
}

