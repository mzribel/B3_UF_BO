package com.b3uf.app.data.model

/**
 * Data class representing a user in the system.
 */
data class User(
    val id: Long,
    val email: String,
    val displayName: String,
    val isAdmin: Boolean
)