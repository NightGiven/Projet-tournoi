package com.tournament.tournament_system.Controller;

import com.tournament.tournament_system.entity.Type_tournoi;
import com.tournament.tournament_system.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/type-tournois")
public class TypeController {

    private final TypeRepository typeTournoiRepository;

    @Autowired
    public TypeController(TypeRepository typeTournoiRepository) {
        this.typeTournoiRepository = typeTournoiRepository;
    }

    // Créer un nouveau type de tournoi
    @PostMapping
    public ResponseEntity<Type_tournoi> createTypeTournoi(@RequestBody Type_tournoi typeTournoi) {
        try {
            Type_tournoi newType = typeTournoiRepository.save(
                    new Type_tournoi(typeTournoi.getType(), typeTournoi.getDescription()));
            return new ResponseEntity<>(newType, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Récupérer tous les types de tournoi
    @GetMapping
    public ResponseEntity<List<Type_tournoi>> getAllTypeTournois() {
        List<Type_tournoi> types = typeTournoiRepository.findAll();
        return new ResponseEntity<>(types, HttpStatus.OK);
    }

    // Récupérer un type par ID
    @GetMapping("/{id}")
    public ResponseEntity<Type_tournoi> getTypeTournoiById(@PathVariable Integer id) {
        Optional<Type_tournoi> typeData = typeTournoiRepository.findById(id);
        return typeData.map(type -> new ResponseEntity<>(type, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Mettre à jour un type de tournoi
    @PutMapping("/{id}")
    public ResponseEntity<Type_tournoi> updateTypeTournoi(
            @PathVariable Integer id,
            @RequestBody Type_tournoi typeTournoi) {
        Optional<Type_tournoi> typeData = typeTournoiRepository.findById(id);

        if (typeData.isPresent()) {
            Type_tournoi existingType = typeData.get();
            existingType.setType(typeTournoi.getType());
            existingType.setDescription(typeTournoi.getDescription());
            return new ResponseEntity<>(
                    typeTournoiRepository.save(existingType),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Supprimer un type de tournoi
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTypeTournoi(@PathVariable Integer id) {
        try {
            typeTournoiRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
