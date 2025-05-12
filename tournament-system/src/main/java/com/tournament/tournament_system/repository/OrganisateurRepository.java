package com.tournament.tournament_system.repository;


import com.tournament.tournament_system.entity.Administrator;
import com.tournament.tournament_system.entity.Organisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrganisateurRepository extends JpaRepository<Organisateur, Integer> {
    Optional<Organisateur> findByUsername(String username);
    Optional<Organisateur> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    List<Organisateur> findByUsernameContainingIgnoreCase(String username);
}
