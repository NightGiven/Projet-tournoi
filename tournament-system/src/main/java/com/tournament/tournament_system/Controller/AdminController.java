package com.tournament.tournament_system.Controller;

import com.tournament.tournament_system.entity.Administrator;
import com.tournament.tournament_system.repository.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdministratorRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> createAdmin(@RequestBody Administrator admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        Administrator savedAdmin = adminRepository.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    @PutMapping("/{id}/permissions")
    public ResponseEntity<Administrator> updatePermissions(@PathVariable Integer id, @RequestBody String permissions) {
        return adminRepository.findById(id)
                .map(admin -> {
                    admin.setPermissions(permissions);
                    return ResponseEntity.ok(adminRepository.save(admin));
                })
                .orElse(ResponseEntity.notFound().build());
    }


}
