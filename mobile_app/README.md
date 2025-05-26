# B3 UF Mobile App

This is a Maven-based Kotlin Android mobile application that integrates with the B3 UF API.

## Features

- User authentication (login/register)
- User profile management
- Breeder and cattery management
- Cat management
- LOOF characteristics management

## Project Structure

The project follows a clean architecture approach with the following layers:

- **UI Layer**: Activities, Fragments, ViewModels
- **Domain Layer**: Use cases, business logic
- **Data Layer**: Repositories, API services, local database

## API Integration

The app communicates with the B3 UF API located at `http://10.0.2.2:8080` (when running in an emulator). The API provides endpoints for:

- Authentication (login/register)
- User management
- Breeder and cattery management
- Cat management
- LOOF characteristics management

## Setup and Running

1. Open the project in an IDE that supports Maven (IntelliJ IDEA, Eclipse with Maven plugin, etc.)
2. Make sure the API server is running on port 8080
3. Build the project using Maven: `mvn clean install`
4. Run the app on an emulator or physical device using Maven: `mvn android:deploy android:run`

## Authentication

The app uses JWT token-based authentication. After successful login or registration, the token is stored securely and used for subsequent API requests.

## Dependencies

- Retrofit for API communication
- Gson for JSON parsing
- Coroutines for asynchronous programming
- Room for local database
- AndroidX libraries for UI components

## Development Notes

- The app targets Android API level 24+ (Android 7.0 and above)
- The app uses ViewBinding for view access
- The app uses the MVVM architecture pattern

## Build System

This project uses Maven instead of Gradle for building the Android application:

- The parent pom.xml in the root directory defines common properties and dependencies
- The app module's pom.xml contains the specific configuration for the Android application
- The project uses the android-maven-plugin for building Android applications
- The kotlin-maven-plugin is used for compiling Kotlin code
