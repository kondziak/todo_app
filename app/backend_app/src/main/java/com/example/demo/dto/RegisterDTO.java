package com.example.demo.dto;

import com.example.demo.configuration.ConstantMessages;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {

    @NotBlank(message = "name: " + ConstantMessages.NOT_BLANK)
    @Size(min = 3, message = "name: " + ConstantMessages.GREATER_THAN_TWO)
    private String name;

    @NotBlank(message = "lastname: " + ConstantMessages.NOT_BLANK)
    private String lastname;

    @Email
    @NotEmpty(message = "email: " + ConstantMessages.NOT_EMPTY)
    private String email;

    @NotBlank(message = "password: " + ConstantMessages.NOT_BLANK)
    @Size(min = 7, message = "password: " + ConstantMessages.GREATER_THAN_SIX)
    private String password;
}
