// Funkce pro navigační menu
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// Funkce pro zavření a otevření chatboxu
function toggleChatbox() {
    const chatbox = document.getElementById('chatbox');
    const chatToggle = document.getElementById('chatbox-toggle');
    if (chatbox.style.display === 'none' || chatbox.style.display === '') {
        chatbox.style.display = 'flex';
        chatToggle.style.display = 'none';
    } else {
        chatbox.style.display = 'none';
        chatToggle.style.display = 'block';
    }
}

// Funkce pro odeslání zprávy do ChatGPT
async function sendMessageToChatGPT() {
    const userMessage = document.getElementById('userMessage').value;
    try {
        const response = await fetch('https://moje-web-stranka.vercel.app/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            throw new Error('Chyba při volání API');
        }

        const data = await response.json();
        const chatBody = document.getElementById('chatbox-body');
        chatBody.innerHTML += `<div class="user-message">${userMessage}</div>`;
        chatBody.innerHTML += `<div class="chatgpt-response">${data.response}</div>`;
    } catch (error) {
        console.error('Chyba:', error);
        document.getElementById('response').innerText = 'Něco se pokazilo, zkuste to prosím později.';
    }
    document.getElementById('userMessage').value = '';
}

// Form submission event listener for contact form
document.getElementById('main-contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const countryCode = document.getElementById('countryCode').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const formData = {
        name: name,
        email: email,
        phone: `${countryCode}${phone}`,
        message: message
    };

    try {
        const response = await fetch('https://moje-web-stranka.vercel.app/send-to-hubspot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Formulář byl úspěšně odeslán.');
        } else {
            alert('Něco se pokazilo. Zkuste to znovu.');
        }
    } catch (error) {
        console.error('Chyba při odesílání:', error);
        alert('Něco se pokazilo. Zkuste to znovu.');
    }
});
