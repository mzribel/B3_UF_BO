package com.b3uf.app.data

import android.content.Context
import android.content.SharedPreferences
import com.b3uf.app.data.model.User
import com.google.gson.Gson

/**
 * Manages user session data, including authentication token and user information.
 */
class SessionManager(context: Context) {
    private var prefs: SharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
    private val gson = Gson()
    
    companion object {
        const val PREF_NAME = "B3UFAppPrefs"
        const val USER_TOKEN = "user_token"
        const val USER_DATA = "user_data"
    }
    
    /**
     * Save authentication token and user data to SharedPreferences.
     */
    fun saveAuthData(token: String, user: User) {
        val editor = prefs.edit()
        editor.putString(USER_TOKEN, token)
        editor.putString(USER_DATA, gson.toJson(user))
        editor.apply()
    }
    
    /**
     * Get the saved authentication token.
     */
    fun getToken(): String? {
        return prefs.getString(USER_TOKEN, null)
    }
    
    /**
     * Get the saved user data.
     */
    fun getUser(): User? {
        val userData = prefs.getString(USER_DATA, null) ?: return null
        return try {
            gson.fromJson(userData, User::class.java)
        } catch (e: Exception) {
            null
        }
    }
    
    /**
     * Check if user is logged in.
     */
    fun isLoggedIn(): Boolean {
        return getToken() != null
    }
    
    /**
     * Clear user session data (logout).
     */
    fun clearSession() {
        val editor = prefs.edit()
        editor.clear()
        editor.apply()
    }
}