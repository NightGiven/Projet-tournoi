package com.tournament.tournament_system.Controller;

import com.tournament.tournament_system.entity.Team;
import com.tournament.tournament_system.repository.PlayerRepository;
import com.tournament.tournament_system.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamRepository teamRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public TeamController(TeamRepository teamRepository, PlayerRepository playerRepository) {
        this.teamRepository = teamRepository;
        this.playerRepository = playerRepository;
    }

    // Créer une nouvelle équipe
    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        // Vérifier que tous les joueurs existent
        if (team.getPlayers() != null) {
            team.getPlayers().forEach(player -> {
                playerRepository.findById(player.getId()).orElseThrow(
                        () -> new RuntimeException("Joueur non trouvé avec l'ID: " + player.getId())
                );
            });
        }

        Team savedTeam = teamRepository.save(team);
        return ResponseEntity.ok(savedTeam);
    }

    // Récupérer toutes les équipes
    @GetMapping
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    // Récupérer une équipe par ID
    @GetMapping("/{teamId}")
    public ResponseEntity<Team> getTeamById(@PathVariable Integer teamId) {
        Optional<Team> team = teamRepository.findById(teamId);
        return team.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Mettre à jour une équipe
    @PutMapping("/{teamId}")
    public ResponseEntity<Team> updateTeam(
            @PathVariable Integer teamId,
            @RequestBody Team teamDetails) {
        return teamRepository.findById(teamId)
                .map(team -> {
                    team.setName(teamDetails.getName());
                    team.setRegion(teamDetails.getRegion());

                    if (teamDetails.getPlayers() != null) {
                        // Vérifier que les nouveaux joueurs existent
                        teamDetails.getPlayers().forEach(player -> {
                            playerRepository.findById(player.getId()).orElseThrow(
                                    () -> new RuntimeException("Joueur non trouvé avec l'ID: " + player.getId())
                            );
                        });
                        team.setPlayers(teamDetails.getPlayers());
                    }

                    Team updatedTeam = teamRepository.save(team);
                    return ResponseEntity.ok(updatedTeam);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Supprimer une équipe
    @DeleteMapping("/{teamId}")
    public ResponseEntity<?> deleteTeam(@PathVariable Integer teamId) {
        return teamRepository.findById(teamId)
                .map(team -> {
                    teamRepository.delete(team);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Rechercher par nom d'équipe
    @GetMapping("/search")
    public List<Team> searchTeamsByName(@RequestParam String name) {
        return teamRepository.findByNameContainingIgnoreCase(name);
    }

    // Filtrer par région
    @GetMapping("/by-region")
    public List<Team> getTeamsByRegion(@RequestParam String region) {
        return teamRepository.findByRegion(region);
    }

    // Trouver les équipes d'un joueur
    @GetMapping("/by-player/{playerId}")
    public List<Team> getTeamsByPlayer(@PathVariable Long playerId) {
        return teamRepository.findByPlayers_PlayerId(playerId);
    }
}
