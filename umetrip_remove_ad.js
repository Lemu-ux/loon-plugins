// This script handles the ad removal for the app

// Trigger when the response matches the pattern
var body = $response.body;

// Remove or alter the ad-related content (mock implementation)
body = body.replace(/广告/g, '');  // Example: Remove '广告' text from the body
$done({ body });