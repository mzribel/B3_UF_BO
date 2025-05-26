package com.b3uf.app.data.model

/**
 * Data class representing a registration request to the API.
 */
data class RegisterRequest(
    val email: String,
    val password: String,
    val displayName: String
)