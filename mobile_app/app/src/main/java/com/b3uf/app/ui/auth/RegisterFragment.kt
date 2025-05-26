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
import com.b3uf.app.databinding.FragmentRegisterBinding

/**
 * Fragment for handling user registration.
 */
class RegisterFragment : Fragment() {
    
    private var _binding: FragmentRegisterBinding? = null
    private val binding get() = _binding!!
    
    private lateinit var viewModel: AuthViewModel
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentRegisterBinding.inflate(inflater, container, false)
        return binding.root
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        viewModel = ViewModelProvider(requireActivity())[AuthViewModel::class.java]
        
        setupListeners()
        observeViewModel()
    }
    
    private fun setupListeners() {
        binding.btnRegister.setOnClickListener {
            val email = binding.etEmail.text.toString().trim()
            val password = binding.etPassword.text.toString().trim()
            val displayName = binding.etDisplayName.text.toString().trim()
            
            if (validateInputs(email, password, displayName)) {
                showLoading(true)
                viewModel.register(email, password, displayName)
            }
        }
        
        binding.tvLoginPrompt.setOnClickListener {
            // Navigate to login fragment
            // findNavController().navigate(R.id.action_registerFragment_to_loginFragment)
        }
    }
    
    private fun observeViewModel() {
        viewModel.registerResult.observe(viewLifecycleOwner) { result ->
            showLoading(false)
            
            result.fold(
                onSuccess = {
                    Toast.makeText(requireContext(), "Registration successful", Toast.LENGTH_SHORT).show()
                    // Navigate to main screen
                    // findNavController().navigate(R.id.action_registerFragment_to_mainFragment)
                },
                onFailure = { exception ->
                    Toast.makeText(requireContext(), "Registration failed: ${exception.message}", Toast.LENGTH_LONG).show()
                }
            )
        }
        
        viewModel.isLoggedIn.observe(viewLifecycleOwner) { isLoggedIn ->
            if (isLoggedIn) {
                // User is already logged in, navigate to main screen
                // findNavController().navigate(R.id.action_registerFragment_to_mainFragment)
            }
        }
    }
    
    private fun validateInputs(email: String, password: String, displayName: String): Boolean {
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
        
        if (displayName.isEmpty()) {
            binding.tilDisplayName.error = "Display name is required"
            isValid = false
        } else if (displayName.length > 20) {
            binding.tilDisplayName.error = "Display name cannot exceed 20 characters"
            isValid = false
        } else {
            binding.tilDisplayName.error = null
        }
        
        return isValid
    }
    
    private fun showLoading(isLoading: Boolean) {
        binding.progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
        binding.btnRegister.isEnabled = !isLoading
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}