# Mockup Description: Login Screen

## 1. Overview

This document describes the visual mockup for the Project LINGKOD login screen. It details the layout, components, and states required for the design.

## 2. Layout

- **Container:** A centered card on a full-screen background.
- **Background:** A subtle, professional background image related to disaster management or geospatial technology.
- **Card:** A white card with a soft shadow, containing the login form.
- **Logo:** The Project LINGKOD logo is prominently displayed at the top of the card.

## 3. Components

- **Header:** "Welcome to LINGKOD"
- **Subheader:** "Provincial Situational Awareness Platform"
- **Username Input:** A standard text input field with a "Username" label and a user icon.
- **Password Input:** A standard password input field with a "Password" label and a lock icon.
- **Remember Me Checkbox:** A checkbox to allow users to stay logged in.
- **Forgot Password Link:** A link to a password reset page.
- **Login Button:** A primary button with the text "Login".
- **Footer:** A small text area at the bottom for copyright information.

## 4. States

### 4.1. Default State

- All fields are empty.
- The "Login" button is active.

### 4.2. Input Focus State

- When a user clicks on an input field, the border of the input field should be highlighted with the primary blue color.

### 4.3. Loading State

- After the user clicks "Login", the button should enter a loading state.
- The button text should be replaced with a spinner icon, and the button should be disabled.

### 4.4. Error State

- **Invalid Credentials:** A danger alert should appear above the form fields with the message "Invalid username or password."
- **Field Validation:** If a field is empty upon submission, the input border should turn red, and a small red text message should appear below the input (e.g., "Username is required.").

## 5. Visual Style

- **Colors:** Adheres to the color palette in the Design System Specification.
- **Typography:** Adheres to the typography rules in the Design System Specification.
- **Spacing:** Consistent use of the 4px base unit for margins and padding.
