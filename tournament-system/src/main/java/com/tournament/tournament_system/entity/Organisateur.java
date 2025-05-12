package com.tournament.tournament_system.entity;

import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "organisateurs")
@Data
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "user_id")
public class Organisateur extends User {

}
