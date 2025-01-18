package com.todo.config;

import com.todo.utils.JwtUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.Resource;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${jwt.header.string}")
    public String HEADER_STRING;

    @Value("${jwt.token.prefix}")
    public String TOKEN_PREFIX;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
   private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String header = request.getHeader("Authorization");
            String username = null;
            String authToken = null;

            if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
//            authToken = header.replace(TOKEN_PREFIX, "").trim();
                authToken = header.substring(7).trim();
                try {
                if(authToken != null && jwtUtils.validateJwtToken(authToken)) {
                    username = jwtUtils.getUsernameFromJwtToken(authToken);

                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                    System.out.println("token::: " +authToken);
                } catch (IllegalArgumentException e) {
                    logger.error("An error occurred while fetching Username from Token", e);
                } catch (ExpiredJwtException e) {
                    logger.warn("The token has expired", e);
                } catch (SignatureException e) {
                    logger.error("Authentication Failed. Username or Password not valid.");
                }

            }else {
                logger.warn("Couldn't find bearer string, header will be ignored");
            }

        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }
        filterChain.doFilter(request, response);

    }
}
