package com.tournament.tournament_system.Controller;
import com.tournament.tournament_system.entity.Inscription_squad;
import com.tournament.tournament_system.entity.Team;
import com.tournament.tournament_system.entity.Tournament;
import com.tournament.tournament_system.repository.Inscription_squad_Repository;
import com.tournament.tournament_system.repository.TeamRepository;
import com.tournament.tournament_system.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inscriptions-squad")
public class InscriptionSquadController {

    private final Inscription_squad_Repository inscriptionSquadRepository;
    private final TournamentRepository tournamentRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public InscriptionSquadController(Inscription_squad_Repository inscriptionSquadRepository,
                                      TournamentRepository tournamentRepository,
                                      TeamRepository teamRepository) {
        this.inscriptionSquadRepository = inscriptionSquadRepository;
        this.tournamentRepository = tournamentRepository;
        this.teamRepository = teamRepository;
    }

    // Créer une inscription d'équipe
    @PostMapping
    public ResponseEntity<?> createInscriptionSquad(@RequestBody Inscription_squad inscriptionSquad) {
        // Vérifier que le tournoi et l'équipe existent
        Tournament tournament = tournamentRepository.findById(inscriptionSquad.getTournoi().getTournament_id())
                .orElseThrow(() -> new RuntimeException("Tournoi non trouvé"));
        Team team = teamRepository.findById(inscriptionSquad.getTeam().getTeam_id())
                .orElseThrow(() -> new RuntimeException("Équipe non trouvée"));

        // Vérifier si l'équipe est déjà inscrite
        if (inscriptionSquadRepository.existsByTournamentIdAndTeamId(tournament.getTournament_id(), team.getTeam_id())) {
            return ResponseEntity.badRequest().body("Cette équipe est déjà inscrite à ce tournoi");
        }

        // Définir la date d'inscription à maintenant si non fournie
        if (inscriptionSquad.getRegisteredAt() == null) {
            inscriptionSquad.setRegisteredAt(LocalDateTime.from(LocalDateTime.now()));
        }

        Inscription_squad savedInscription = inscriptionSquadRepository.save(inscriptionSquad);
        return ResponseEntity.ok(savedInscription);
    }

    // Récupérer toutes les inscriptions d'équipes
    @GetMapping
    public List<Inscription_squad> getAllInscriptionsSquad() {
        return inscriptionSquadRepository.findAll();
    }

    // Récupérer une inscription par ID
    @GetMapping("/{id}")
    public ResponseEntity<Inscription_squad> getInscriptionSquadById(@PathVariable Integer id) {
        return inscriptionSquadRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Supprimer une inscription
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInscriptionSquad(@PathVariable Integer id) {
        return inscriptionSquadRepository.findById(id)
                .map(inscription -> {
                    inscriptionSquadRepository.delete(inscription);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Récupérer les inscriptions d'un tournoi
    @GetMapping("/by-tournament/{tournamentId}")
    public List<Inscription_squad> getInscriptionsByTournament(@PathVariable Integer tournamentId) {
        return inscriptionSquadRepository.findByTournamentId(tournamentId);
    }

    // Récupérer les inscriptions d'une équipe
    @GetMapping("/by-team/{teamId}")
    public List<Inscription_squad> getInscriptionsByTeam(@PathVariable Integer teamId) {
        return inscriptionSquadRepository.findByTeamId(teamId);
    }

    // Récupérer les inscriptions entre deux dates
    @GetMapping("/by-date-range")
    public List<Inscription_squad> getInscriptionsByDateRange(
            @RequestParam String start,
            @RequestParam String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        return inscriptionSquadRepository.findByDateInscriptionBetween(startDate, endDate);
    }
}