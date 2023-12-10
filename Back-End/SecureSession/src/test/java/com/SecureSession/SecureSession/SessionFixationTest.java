package com.SecureSession.SecureSession;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
public class SessionFixationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testSessionFixation() throws Exception {
        // Example registration request JSON
        String registerRequestJson = "{\"username\":\"testuser\", \"password\":\"testpass\"}";

        // Make a request to an unauthenticated endpoint
        MvcResult unauthenticatedResult = mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerRequestJson))
                .andExpect(status().isOk())
                .andReturn();

        // Get the session ID before authentication
        MockHttpSession sessionBeforeAuth = (MockHttpSession) unauthenticatedResult.getRequest().getSession();
        String sessionIdBeforeAuth = sessionBeforeAuth.getId();

        // Example login request JSON
        String loginRequestJson = "{\"username\":\"testuser\", \"password\":\"testpass\"}";

        // Perform the authentication (login)
        MvcResult authenticatedResult = mockMvc.perform(post("/login")
                        .session(sessionBeforeAuth) // use the same session
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginRequestJson))
                .andExpect(status().isOk())
                .andReturn();

        // Get the session ID after authentication
        MockHttpSession sessionAfterAuth = (MockHttpSession) authenticatedResult.getRequest().getSession();
        String sessionIdAfterAuth = sessionAfterAuth.getId();

        // Assert that the session IDs are different
        assertThat(sessionIdBeforeAuth).isNotEqualTo(sessionIdAfterAuth);
    }
}
