// Add this at the beginning of your DOMContentLoaded event listener in script.js
const themeToggle = document.getElementById('theme-toggle');
    
// Check for saved theme preference or use default
const savedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);

// Toggle theme when button is clicked
themeToggle.addEventListener('click', function() {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('email-generator-form');
    const resultsSection = document.getElementById('results');
    const copyBtn = document.getElementById('copy-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');
    
    // Google Apps Script Web App URL (you'll get this after deployment)
    const API_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Generating...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = {
            senderLinkedin: document.getElementById('sender-linkedin').value,
            recipientLinkedin: document.getElementById('recipient-linkedin').value,
            occasion: document.getElementById('occasion').value,
            tone: document.getElementById('tone').value
        };
        
        // Send data to Google Sheets API
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Reset button state
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            
            if (data.success) {
                // Update synergy highlights
                document.querySelector('.synergy-highlights p').innerText = 
                    `You share ${data.sharedSkills.length} skills and have ${data.mutualConnections} mutual connections. Your synergy score is ${data.synergyScore}.`;
                
                // Update email subject and body
                document.querySelector('.email-subject p').innerText = `Subject: ${data.generatedSubject}`;
                document.querySelector('.email-body').innerHTML = data.generatedEmail.replace(/\n/g, '<br>');
                
                // Show results section
                resultsSection.style.display = 'block';
                
                // Scroll to results
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Error generating email: ' + (data.error || 'Unknown error'));
            }
        })
        .catch(error => {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            console.error('Error:', error);
            alert('Error connecting to the server. Please try again.');
        });
    });
    
    // Copy to clipboard functionality
    copyBtn.addEventListener('click', function() {
        const emailText = document.querySelector('.email-body').innerText;
        const emailSubject = document.querySelector('.email-subject').innerText;
        
        navigator.clipboard.writeText(emailSubject + '\n\n' + emailText)
            .then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Copied!';
                
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    });
    
    // Regenerate functionality
    regenerateBtn.addEventListener('click', function() {
        // In a real implementation, this would call your API again with a different seed
        // For now, just submit the form again
        form.dispatchEvent(new Event('submit'));
    });
});
