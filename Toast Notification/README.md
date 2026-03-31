Approach
HTML Structure: The HTML defines a .toast-buttons container with buttons for different toast types, and an empty .toast-overlay for displaying notifications.
CSS - Toast Styling: The .toast container is styled with a fixed position, smooth entrance animations (slideInRight), and a disappearing effect (fadeOut).
CSS - Progress Bar and Transitions: The .toast-progress bar shows duration using width animation (toastProgress), while .toast-success, .toast-danger, etc., apply distinct background colors.
JavaScript - Toast Logic Initialization: The showToast function creates a dynamic .toast element based on the button clicked, customizing its type, message, and duration.
JavaScript - Handling Multiple Toasts: If a toast is already visible, it is removed before displaying a new one, ensuring only one notification is active at once.
JavaScript - Event Listeners for Buttons: Event listeners are attached to buttons, triggering the appropriate showToast call with customized messages, icons, and styles for each notification type.