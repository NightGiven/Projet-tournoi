package com.tournament.tournament_system.Controller;
import com.tournament.tournament_system.entity.Organisateur;
import com.tournament.tournament_system.repository.OrganisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/organisateurs")
public class OrganisateurController {

    private final OrganisateurRepository organisateurRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public OrganisateurController(OrganisateurRepository organisateurRepository,
                                  PasswordEncoder passwordEncoder) {
        this.organisateurRepository = organisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Créer un nouvel organisateur
     */
    @PostMapping
    public ResponseEntity<?> createOrganisateur(@RequestBody Organisateur organisateur) {
        // Vérifier si le username existe déjà
        if (organisateurRepository.existsByUsername(organisateur.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Erreur: Ce nom d'utilisateur est déjà pris!");
        }

        // Vérifier si l'email existe déjà
        if (organisateurRepository.existsByEmail(organisateur.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Erreur: Cet email est déjà utilisé!");
        }

        // Encoder le mot de passe
        organisateur.setPassword(passwordEncoder.encode(organisateur.getPassword()));

        Organisateur savedOrganisateur = organisateurRepository.save(organisateur);
        return ResponseEntity.ok(savedOrganisateur);
    }

    /**
     * Récupérer tous les organisateurs
     */
    @GetMapping
    public List<Organisateur> getAllOrganisateurs() {
        return organisateurRepository.findAll();
    }

    /**
     * Récupérer un organisateur par son ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Organisateur> getOrganisateurById(@PathVariable Integer id) {
        Optional<Organisateur> organisateur = organisateurRepository.findById(id);
        return organisateur.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Mettre à jour un organisateur
     */
    @PutMapping("/{id}")
    public ResponseEntity<Organisateur> updateOrganisateur(
            @PathVariable Integer id,
            @RequestBody Organisateur organisateurDetails) {
        return organisateurRepository.findById(id)
                .map(organisateur -> {
                    organisateur.setUsername(organisateurDetails.getUsername());
                    organisateur.setEmail(organisateurDetails.getEmail());

                    // Mettre à jour le mot de passe seulement si fourni
                    if (organisateurDetails.getPassword() != null && !organisateurDetails.getPassword().isEmpty()) {
                        organisateur.setPassword(passwordEncoder.encode(organisateurDetails.getPassword()));
                    }

                    Organisateur updatedOrganisateur = organisateurRepository.save(organisateur);
                    return ResponseEntity.ok(updatedOrganisateur);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Supprimer un organisateur
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrganisateur(@PathVariable Integer id) {
        return organisateurRepository.findById(id)
                .map(organisateur -> {
                    organisateurRepository.delete(organisateur);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Rechercher par nom d'utilisateur
     */
    @GetMapping("/search")
    public ResponseEntity<List<Organisateur>> searchByUsername(@RequestParam String username) {
        List<Organisateur> organisateurs = organisateurRepository.findByUsernameContainingIgnoreCase(username);
        return ResponseEntity.ok(organisateurs);
    }
}
