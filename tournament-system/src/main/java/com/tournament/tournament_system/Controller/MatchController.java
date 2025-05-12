package com.tournament.tournament_system.Controller;
import com.tournament.tournament_system.entity.Match;
import com.tournament.tournament_system.repository.BracketRepository;
import com.tournament.tournament_system.repository.MatchRepository;
import com.tournament.tournament_system.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    private final MatchRepository matchRepository;
    private final BracketRepository bracketRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public MatchController(MatchRepository matchRepository,
                           BracketRepository bracketRepository,
                           TeamRepository teamRepository) {
        this.matchRepository = matchRepository;
        this.bracketRepository = bracketRepository;
        this.teamRepository = teamRepository;
    }

    // Créer un nouveau match
    @PostMapping
    public ResponseEntity<Match> createMatch(@RequestBody Match match) {
        // Validation des entités associées
        validateMatchEntities(match);

        Match savedMatch = matchRepository.save(match);
        return ResponseEntity.ok(savedMatch);
    }

    // Récupérer tous les matchs
    @GetMapping
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    // Récupérer un match par ID
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Integer id) {
        return matchRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Mettre à jour un match
    @PutMapping("/{id}")
    public ResponseEntity<Match> updateMatch(@PathVariable Integer id, @RequestBody Match matchDetails) {
        return matchRepository.findById(id)
                .map(match -> {
                    updateMatchFields(match, matchDetails);
                    Match updatedMatch = matchRepository.save(match);
                    return ResponseEntity.ok(updatedMatch);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Supprimer un match
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMatch(@PathVariable Integer id) {
        return matchRepository.findById(id)
                .map(match -> {
                    matchRepository.delete(match);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Rechercher par bracket
    @GetMapping("/by-bracket/{bracketId}")
    public List<Match> getMatchesByBracket(@PathVariable Long bracketId) {
        return matchRepository.findByBracketId(bracketId);
    }

    // Rechercher par équipe
    @GetMapping("/by-team/{teamId}")
    public List<Match> getMatchesByTeam(@PathVariable Long teamId) {
        return matchRepository.findByTeam1IdOrTeam2Id(teamId, teamId);
    }

    // Rechercher par période
    @GetMapping("/by-date-range")
    public List<Match> getMatchesByDateRange(
            @RequestParam String start,
            @RequestParam String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        return matchRepository.findByDateBetween(startDate, endDate);
    }

    // Rechercher par statut
    @GetMapping("/by-status/{status}")
    public List<Match> getMatchesByStatus(@PathVariable String status) {
        return matchRepository.findByStatus(status);
    }

    // Méthodes utilitaires
    private void validateMatchEntities(Match match) {
        bracketRepository.findById(match.getBracket().getId())
                .orElseThrow(() -> new RuntimeException("Bracket non trouvé"));
        teamRepository.findById(match.getTeamA().getTeam_id())
                .orElseThrow(() -> new RuntimeException("Équipe 1 non trouvée"));
        teamRepository.findById(match.getTeamB().getTeam_id())
                .orElseThrow(() -> new RuntimeException("Équipe 2 non trouvée"));
    }

    private void updateMatchFields(Match match, Match matchDetails) {
        if (matchDetails.getBracket() != null) {
            bracketRepository.findById(matchDetails.getBracket().getId())
                    .orElseThrow(() -> new RuntimeException("Bracket non trouvé"));
            match.setBracket(matchDetails.getBracket());
        }
        if (matchDetails.getTeamA() != null) {
            teamRepository.findById(matchDetails.getTeamA().getTeam_id())
                    .orElseThrow(() -> new RuntimeException("Équipe 1 non trouvée"));
            match.setTeamA(matchDetails.getTeamA());
        }
        if (matchDetails.getTeamB() != null) {
            teamRepository.findById(matchDetails.getTeamB().getTeam_id())
                    .orElseThrow(() -> new RuntimeException("Équipe 2 non trouvée"));
            match.setTeamB(matchDetails.getTeamB());
        }
        if (matchDetails.getScheduledAt() != null) {
            match.setScheduledAt(matchDetails.getScheduledAt());
        }
        if (matchDetails.getStatus() != null) {
            match.setStatus(matchDetails.getStatus());
        }
    }
}
