package com.b3uf.app.data.model

import com.google.gson.annotations.SerializedName

/**
 * Data class representing the response from authentication endpoints (login/register).
 */
data class AuthResponse(
    @SerializedName("user")
    val user: User,
    val token: String
)