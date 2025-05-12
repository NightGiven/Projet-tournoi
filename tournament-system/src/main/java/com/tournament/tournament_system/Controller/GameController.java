package com.tournament.tournament_system.Controller;

import com.tournament.tournament_system.entity.Game;
import com.tournament.tournament_system.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    /**
     * Récupère tous les jeux
     *
     * @return Liste de tous les jeux
     */
    @GetMapping("/list")
    public ResponseEntity<List<Game>> getAllGames() {
        try {
            List<Game> games = gameRepository.findAll();

            if (games.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(games, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Récupère un jeu par son ID
     *
     * @param id ID du jeu
     * @return Le jeu correspondant
     */
    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Integer id) {
        Optional<Game> gameData = gameRepository.findById(id);

        return gameData.map(game -> new ResponseEntity<>(game, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Crée un nouveau jeu
     *
     * @param game Détails du jeu à créer
     * @return Le jeu créé
     */
    @PostMapping("/add")
    public ResponseEntity<Game> createGame(@RequestBody Game game) {
        try {
            Game newGame = gameRepository.save(
                    new Game(game.getNom(), game.getDeveloppeur()));
            return new ResponseEntity<>(newGame, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Met à jour un jeu existant
     *
     * @param id   ID du jeu à mettre à jour
     * @param game Détails du jeu mis à jour
     * @return Le jeu mis à jour
     */
    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable Integer id, @RequestBody Game game) {
        Optional<Game> gameData = gameRepository.findById(id);

        if (gameData.isPresent()) {
            Game existingGame = gameData.get();
            existingGame.setNom(game.getNom());
            existingGame.setDeveloppeur(game.getDeveloppeur());
            return new ResponseEntity<>(gameRepository.save(existingGame), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Supprime un jeu
     *
     * @param id ID du jeu à supprimer
     * @return Réponse vide avec statut NO_CONTENT
     */
    @DeleteMapping("del/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        try {
            gameRepository.deleteById(Math.toIntExact(id));
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Recherche des jeux par nom
     * @param name Nom ou partie du nom à rechercher
     * @return Liste des jeux correspondants
     */
}