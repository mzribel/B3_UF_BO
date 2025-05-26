package com.b3uf.app.data.api

import com.b3uf.app.data.model.AuthResponse
import com.b3uf.app.data.model.LoginRequest
import com.b3uf.app.data.model.RegisterRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

/**
 * Retrofit service interface for authentication-related API endpoints.
 */
interface AuthApiService {
    
    /**
     * Login a user with email and password.
     * 
     * @param loginRequest The login credentials
     * @return Response containing user data and authentication token
     */
    @POST("/auth/login")
    suspend fun login(@Body loginRequest: LoginRequest): Response<AuthResponse>
    
    /**
     * Register a new user.
     * 
     * @param registerRequest The registration data
     * @return Response containing the created user data and authentication token
     */
    @POST("/auth/register")
    suspend fun register(@Body registerRequest: RegisterRequest): Response<AuthResponse>
}