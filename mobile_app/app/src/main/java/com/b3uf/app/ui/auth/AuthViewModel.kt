package com.b3uf.app.ui.auth

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.b3uf.app.data.SessionManager
import com.b3uf.app.data.model.AuthResponse
import com.b3uf.app.data.repository.AuthRepository
import kotlinx.coroutines.launch

/**
 * ViewModel for handling authentication operations.
 */
class AuthViewModel(application: Application) : AndroidViewModel(application) {
    private val authRepository = AuthRepository()
    private val sessionManager = SessionManager(application.applicationContext)
    
    private val _loginResult = MutableLiveData<Result<AuthResponse>>()
    val loginResult: LiveData<Result<AuthResponse>> = _loginResult
    
    private val _registerResult = MutableLiveData<Result<AuthResponse>>()
    val registerResult: LiveData<Result<AuthResponse>> = _registerResult
    
    private val _isLoggedIn = MutableLiveData<Boolean>()
    val isLoggedIn: LiveData<Boolean> = _isLoggedIn
    
    init {
        _isLoggedIn.value = sessionManager.isLoggedIn()
    }
    
    /**
     * Login a user with email and password.
     */
    fun login(email: String, password: String) {
        viewModelScope.launch {
            try {
                val response = authRepository.login(email, password)
                if (response.isSuccessful && response.body() != null) {
                    val authResponse = response.body()!!
                    sessionManager.saveAuthData(authResponse.token, authResponse.user)
                    _isLoggedIn.value = true
                    _loginResult.value = Result.success(authResponse)
                } else {
                    _loginResult.value = Result.failure(Exception("Login failed: ${response.message()}"))
                }
            } catch (e: Exception) {
                _loginResult.value = Result.failure(e)
            }
        }
    }
    
    /**
     * Register a new user.
     */
    fun register(email: String, password: String, displayName: String) {
        viewModelScope.launch {
            try {
                val response = authRepository.register(email, password, displayName)
                if (response.isSuccessful && response.body() != null) {
                    val authResponse = response.body()!!
                    sessionManager.saveAuthData(authResponse.token, authResponse.user)
                    _isLoggedIn.value = true
                    _registerResult.value = Result.success(authResponse)
                } else {
                    _registerResult.value = Result.failure(Exception("Registration failed: ${response.message()}"))
                }
            } catch (e: Exception) {
                _registerResult.value = Result.failure(e)
            }
        }
    }
    
    /**
     * Logout the current user.
     */
    fun logout() {
        sessionManager.clearSession()
        _isLoggedIn.value = false
    }
}