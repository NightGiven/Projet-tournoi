package com.tournament.tournament_system.Controller;
import com.tournament.tournament_system.entity.Bracket;
import com.tournament.tournament_system.entity.Match;
import com.tournament.tournament_system.repository.BracketRepository;
import com.tournament.tournament_system.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/brackets")
public class BracketController {

    private final BracketRepository bracketRepository;
    private final MatchRepository matchRepository;

    @Autowired
    public BracketController(BracketRepository bracketRepository,
                             MatchRepository matchRepository) {
        this.bracketRepository = bracketRepository;
        this.matchRepository = matchRepository;
    }

    // Créer un nouveau bracket
    @PostMapping
    public ResponseEntity<Bracket> createBracket(@RequestBody Bracket bracket) {
        // Sauvegarder d'abord le bracket
        Bracket savedBracket = bracketRepository.save(bracket);

        // Si des matches sont fournis, les associer
        if (bracket.getMatches() != null && !bracket.getMatches().isEmpty()) {
            bracket.getMatches().forEach(match -> {
                match.setBracket(savedBracket);
                matchRepository.save(match);
            });
        }

        return ResponseEntity.ok(savedBracket);
    }

    // Récupérer tous les brackets
    @GetMapping
    public List<Bracket> getAllBrackets() {
        return bracketRepository.findAll();
    }

    // Récupérer un bracket par ID
    @GetMapping("/{id}")
    public ResponseEntity<Bracket> getBracketById(@PathVariable Integer id) {
        return bracketRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Mettre à jour un bracket
    @PutMapping("/{id}")
    public ResponseEntity<Bracket> updateBracket(
            @PathVariable Integer id,
            @RequestBody Bracket bracketDetails) {
        return bracketRepository.findById(id)
                .map(bracket -> {
                    bracket.setName(bracketDetails.getName());;

                    // Mise à jour des matches si fournis
                    if (bracketDetails.getMatches() != null) {
                        // Supprimer les anciens matches non présents dans la nouvelle liste
                        bracket.getMatches().stream()
                                .filter(match -> !bracketDetails.getMatches().contains(match))
                                .forEach(match -> matchRepository.delete(match));

                        // Ajouter/mettre à jour les nouveaux matches
                        bracketDetails.getMatches().forEach(match -> {
                            match.setBracket(bracket);
                            matchRepository.save(match);
                        });

                        bracket.setMatches(bracketDetails.getMatches());
                    }

                    Bracket updatedBracket = bracketRepository.save(bracket);
                    return ResponseEntity.ok(updatedBracket);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Supprimer un bracket
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBracket(@PathVariable Integer id) {
        return bracketRepository.findById(id)
                .map(bracket -> {
                    // Supprimer d'abord tous les matches associés
                    bracket.getMatches().forEach(matchRepository::delete);
                    bracketRepository.delete(bracket);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Rechercher par nom
    @GetMapping("/search")
    public List<Bracket> searchBrackets(@RequestParam String nom) {
        return bracketRepository.findByNomContainingIgnoreCase(nom);
    }

    // Récupérer les matches d'un bracket
    @GetMapping("/{id}/matches")
    public ResponseEntity<List<Match>> getBracketMatches(@PathVariable Integer id) {
        return bracketRepository.findById(id)
                .map(bracket -> ResponseEntity.ok(bracket.getMatches()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
