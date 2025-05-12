package com.tournament.tournament_system.Controller;
import com.tournament.tournament_system.entity.Tournament;
import com.tournament.tournament_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

    private final TournamentRepository tournamentRepository;
    private final OrganisateurRepository organisateurRepository;
    private final GameRepository gameRepository;
    private final BracketRepository bracketRepository;
    private final TypeRepository typeTournoiRepository;
    private final RuleRepository ruleRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public TournamentController(TournamentRepository tournamentRepository,
                                OrganisateurRepository organisateurRepository,
                                GameRepository gameRepository,
                                BracketRepository bracketRepository,
                                TypeRepository typeTournoiRepository,
                                RuleRepository ruleRepository,
                                TeamRepository teamRepository) {
        this.tournamentRepository = tournamentRepository;
        this.organisateurRepository = organisateurRepository;
        this.gameRepository = gameRepository;
        this.bracketRepository = bracketRepository;
        this.typeTournoiRepository = typeTournoiRepository;
        this.ruleRepository = ruleRepository;
        this.teamRepository = teamRepository;
    }

    @PostMapping
    public ResponseEntity<?> createTournament(@RequestBody Tournament tournament) {
        // Validation des entités associées
        validateAssociatedEntities(tournament);

        Tournament savedTournament = tournamentRepository.save(tournament);
        return ResponseEntity.ok(savedTournament);
    }

    @GetMapping
    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tournament> getTournamentById(@PathVariable Integer id) {
        return tournamentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tournament> updateTournament(@PathVariable Integer id,
                                                       @RequestBody Tournament tournamentDetails) {
        return tournamentRepository.findById(id)
                .map(tournament -> {
                    updateTournamentFields(tournament, tournamentDetails);
                    Tournament updatedTournament = tournamentRepository.save(tournament);
                    return ResponseEntity.ok(updatedTournament);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTournament(@PathVariable Integer id) {
        return tournamentRepository.findById(id)
                .map(tournament -> {
                    tournamentRepository.delete(tournament);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Méthodes utilitaires
    private void validateAssociatedEntities(Tournament tournament) {
        organisateurRepository.findById(tournament.getOrganisateur().getId())
                .orElseThrow(() -> new RuntimeException("Organisateur non trouvé"));
        gameRepository.findById(tournament.getGame().getGame_id())
                .orElseThrow(() -> new RuntimeException("Jeu non trouvé"));
        bracketRepository.findById(tournament.getBrackette().getId())
                .orElseThrow(() -> new RuntimeException("Bracket non trouvé"));
        typeTournoiRepository.findById(tournament.getType().getId())
                .orElseThrow(() -> new RuntimeException("Type de tournoi non trouvé"));

        if (tournament.getWinner() != null) {
            teamRepository.findById(tournament.getWinner().getTeam_id())
                    .orElseThrow(() -> new RuntimeException("Équipe vainqueur non trouvée"));
        }
        // Validation similaire pour les autres équipes...
    }

    private void updateTournamentFields(Tournament tournament, Tournament tournamentDetails) {
        if (tournamentDetails.getName() != null) {
            tournament.setName(tournamentDetails.getName());
        }
        if (tournamentDetails.getOrganisateur() != null) {
            tournament.setOrganisateur(tournamentDetails.getOrganisateur());
        }
        // Mise à jour similaire pour les autres champs...
    }
}
