package com.SecureSession.SecureSession;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.SecureSession.SecureSession.Model.AuthenticationRequest;
import com.SecureSession.SecureSession.Model.AuthenticationResponse;
import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureMockMvc
public class TokenExpirationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testTokenExpiration() throws Exception {
        // Create authentication request
        AuthenticationRequest request = new AuthenticationRequest("testuser", "testpass");

        // Perform login and receive token
        String responseString = mockMvc.perform(post("/login")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        AuthenticationResponse response = objectMapper.readValue(responseString, AuthenticationResponse.class);
        String token = response.getToken();

        // Sleep to allow the token to expire
        // Adjust the duration according to your token's expiration time
        Thread.sleep(5000); // Waiting for 10 seconds

        // Use the token to access a protected endpoint
        mockMvc.perform(post("/user/welcome") // Replace with a real protected endpoint
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isUnauthorized());
    }
}
