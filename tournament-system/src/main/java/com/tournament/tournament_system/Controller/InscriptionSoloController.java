package com.tournament.tournament_system.Controller;

import com.tournament.tournament_system.entity.Inscription_solo;
import com.tournament.tournament_system.entity.Player;
import com.tournament.tournament_system.entity.Tournament;
import com.tournament.tournament_system.repository.Inscription_solo_Repository;
import com.tournament.tournament_system.repository.PlayerRepository;
import com.tournament.tournament_system.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/inscriptions-solo")
public class InscriptionSoloController {

    private final Inscription_solo_Repository inscriptionSoloRepository;
    private final TournamentRepository tournamentRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public InscriptionSoloController(Inscription_solo_Repository inscriptionSoloRepository,
                                     TournamentRepository tournamentRepository,
                                     PlayerRepository playerRepository) {
        this.inscriptionSoloRepository = inscriptionSoloRepository;
        this.tournamentRepository = tournamentRepository;
        this.playerRepository = playerRepository;
    }

    // Créer une inscription solo
    @PostMapping
    public ResponseEntity<?> createInscriptionSolo(@RequestBody Inscription_solo inscriptionSolo) {
        // Vérifier que le tournoi et le joueur existent
        Tournament tournament = tournamentRepository.findById(inscriptionSolo.getTournoi().getTournament_id())
                .orElseThrow(() -> new RuntimeException("Tournoi non trouvé"));
        Player player = playerRepository.findById(inscriptionSolo.getJoueur().getId())
                .orElseThrow(() -> new RuntimeException("Joueur non trouvé"));

        // Définir la date d'inscription à maintenant si non fournie
        if (inscriptionSolo.getRegisteredAt() == null) {
            inscriptionSolo.setRegisteredAt(LocalDate.from(LocalDateTime.now()));
        }

        Inscription_solo savedInscription = inscriptionSoloRepository.save(inscriptionSolo);
        return ResponseEntity.ok(savedInscription);
    }

    // Récupérer toutes les inscriptions solo
    @GetMapping
    public List<Inscription_solo> getAllInscriptionsSolo() {
        return inscriptionSoloRepository.findAll();
    }

    // Récupérer une inscription par ID
    @GetMapping("/{id}")
    public ResponseEntity<Inscription_solo> getInscriptionSoloById(@PathVariable Integer id) {
        return inscriptionSoloRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Supprimer une inscription
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInscriptionSolo(@PathVariable Integer id) {
        return inscriptionSoloRepository.findById(id)
                .map(inscription -> {
                    inscriptionSoloRepository.delete(inscription);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Récupérer les inscriptions d'un tournoi
    @GetMapping("/by-tournament/{tournamentId}")
    public List<Inscription_solo> getInscriptionsByTournament(@PathVariable Long tournamentId) {
        return inscriptionSoloRepository.findByTournamentId(tournamentId);
    }

    // Récupérer les inscriptions d'un joueur
    @GetMapping("/by-player/{playerId}")
    public List<Inscription_solo> getInscriptionsByPlayer(@PathVariable Long playerId) {
        return inscriptionSoloRepository.findByPlayerId(playerId);
    }

    // Récupérer les inscriptions entre deux dates
    @GetMapping("/by-date-range")
    public List<Inscription_solo> getInscriptionsByDateRange(
            @RequestParam String start,
            @RequestParam String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        return inscriptionSoloRepository.findByDateInscriptionBetween(startDate, endDate);
    }
}
