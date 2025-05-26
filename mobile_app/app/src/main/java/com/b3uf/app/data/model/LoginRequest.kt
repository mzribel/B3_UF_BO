package com.b3uf.app.data.model

/**
 * Data class representing a login request to the API.
 */
data class LoginRequest(
    val email: String,
    val password: String
)