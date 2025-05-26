package com.b3uf.app.ui.auth

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.b3uf.app.R
import com.b3uf.app.databinding.FragmentLoginBinding

/**
 * Fragment for handling user login.
 */
class LoginFragment : Fragment() {
    
    private var _binding: FragmentLoginBinding? = null
    private val binding get() = _binding!!
    
    private lateinit var viewModel: AuthViewModel
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentLoginBinding.inflate(inflater, container, false)
        return binding.root
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        viewModel = ViewModelProvider(requireActivity())[AuthViewModel::class.java]
        
        setupListeners()
        observeViewModel()
    }
    
    private fun setupListeners() {
        binding.btnLogin.setOnClickListener {
            val email = binding.etEmail.text.toString().trim()
            val password = binding.etPassword.text.toString().trim()
            
            if (validateInputs(email, password)) {
                showLoading(true)
                viewModel.login(email, password)
            }
        }
        
        binding.tvRegisterPrompt.setOnClickListener {
            // Navigate to register fragment
            // findNavController().navigate(R.id.action_loginFragment_to_registerFragment)
        }
    }
    
    private fun observeViewModel() {
        viewModel.loginResult.observe(viewLifecycleOwner) { result ->
            showLoading(false)
            
            result.fold(
                onSuccess = {
                    Toast.makeText(requireContext(), "Login successful", Toast.LENGTH_SHORT).show()
                    // Navigate to main screen
                    // findNavController().navigate(R.id.action_loginFragment_to_mainFragment)
                },
                onFailure = { exception ->
                    Toast.makeText(requireContext(), "Login failed: ${exception.message}", Toast.LENGTH_LONG).show()
                }
            )
        }
        
        viewModel.isLoggedIn.observe(viewLifecycleOwner) { isLoggedIn ->
            if (isLoggedIn) {
                // User is already logged in, navigate to main screen
                // findNavController().navigate(R.id.action_loginFragment_to_mainFragment)
            }
        }
    }
    
    private fun validateInputs(email: String, password: String): Boolean {
        var isValid = true
        
        if (email.isEmpty()) {
            binding.tilEmail.error = "Email is required"
            isValid = false
        } else {
            binding.tilEmail.error = null
        }
        
        if (password.isEmpty()) {
            binding.tilPassword.error = "Password is required"
            isValid = false
        } else {
            binding.tilPassword.error = null
        }
        
        return isValid
    }
    
    private fun showLoading(isLoading: Boolean) {
        binding.progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
        binding.btnLogin.isEnabled = !isLoading
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}