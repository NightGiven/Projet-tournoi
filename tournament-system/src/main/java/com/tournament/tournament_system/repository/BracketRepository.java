package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Bracket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BracketRepository extends JpaRepository<Bracket, Integer> {
    List<Bracket> findByNomContainingIgnoreCase(String nom);

}

