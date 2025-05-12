package com.tournament.tournament_system.Controller;

import com.tournament.tournament_system.entity.Rule;
import com.tournament.tournament_system.repository.RuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rules")
public class RuleController {

    private final RuleRepository ruleRepository;

    @Autowired
    public RuleController(RuleRepository ruleRepository) {
        this.ruleRepository = ruleRepository;
    }

    // Créer une nouvelle règle
    @PostMapping("/add")
    public ResponseEntity<Rule> createRule(@RequestBody Rule rule) {
        try {
            Rule newRule = ruleRepository.save(new Rule(rule.getDescription()));
            return new ResponseEntity<>(newRule, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Récupérer toutes les règles
    @GetMapping("/list")
    public ResponseEntity<List<Rule>> getAllRules() {
        List<Rule> rules = ruleRepository.findAll();
        return new ResponseEntity<>(rules, HttpStatus.OK);
    }

    // Récupérer une règle par ID
    @GetMapping("/{id}")
    public ResponseEntity<Rule> getRuleById(@PathVariable Integer id) {
        Optional<Rule> ruleData = ruleRepository.findById(id);
        return ruleData.map(rule -> new ResponseEntity<>(rule, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Mettre à jour une règle
    @PutMapping("/{id}")
    public ResponseEntity<Rule> updateRule(@PathVariable Integer id, @RequestBody Rule rule) {
        Optional<Rule> ruleData = ruleRepository.findById(id);

        if (ruleData.isPresent()) {
            Rule existingRule = ruleData.get();
            existingRule.setDescription(rule.getDescription());
            return new ResponseEntity<>(ruleRepository.save(existingRule), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Supprimer une règle
    @DeleteMapping("/del/{id}")
    public ResponseEntity<HttpStatus> deleteRule(@PathVariable Integer id) {
        try {
            ruleRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}