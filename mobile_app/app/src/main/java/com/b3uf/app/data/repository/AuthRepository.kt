package com.b3uf.app.data.repository

import com.b3uf.app.data.api.RetrofitClient
import com.b3uf.app.data.model.AuthResponse
import com.b3uf.app.data.model.LoginRequest
import com.b3uf.app.data.model.RegisterRequest
import retrofit2.Response

/**
 * Repository class that handles authentication-related operations.
 */
class AuthRepository {
    private val authApiService = RetrofitClient.authApiService
    
    /**
     * Login a user with email and password.
     * 
     * @param email User's email
     * @param password User's password
     * @return Response containing user data and authentication token
     */
    suspend fun login(email: String, password: String): Response<AuthResponse> {
        return authApiService.login(LoginRequest(email, password))
    }
    
    /**
     * Register a new user.
     * 
     * @param email User's email
     * @param password User's password
     * @param displayName User's display name
     * @return Response containing the created user data and authentication token
     */
    suspend fun register(email: String, password: String, displayName: String): Response<AuthResponse> {
        return authApiService.register(RegisterRequest(email, password, displayName))
    }
}