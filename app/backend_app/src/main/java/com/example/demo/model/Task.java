package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = true)
@ToString(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tasks")
public class Task extends AbstractEntity {

    @ToString.Include
    @NotBlank
    private String title;

    @ToString.Include
    @NotBlank
    private String description;

    @ToString.Include
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date")
    private Date creationDate;

    @ToString.Include
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "finish_date")
    private Date finishDate;

    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "user_id")
    private User user;

    public Long getTaskId() {
        return this.getId();
    }
}