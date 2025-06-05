document.addEventListener('DOMContentLoaded', () => {
    // Video Modal Functionality
    const playVideoButton = document.getElementById('play-video-button');
    const videoModal = document.getElementById('video-modal');
    const modalContent = videoModal.querySelector('.modal-content');
    const closeModalButton = videoModal.querySelector('.modal-close');
    const modalOverlay = videoModal.querySelector('.modal-overlay');
    const videoIframe = videoModal.querySelector('iframe');
    const videoSrc = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Placeholder YouTube video URL

    let previouslyFocusedElement;

    function openModal() {
        previouslyFocusedElement = document.activeElement;
        videoModal.style.display = 'flex'; // Or use a class: videoModal.classList.add('is-open');
        videoModal.removeAttribute('hidden');
        videoIframe.src = videoSrc; // Set src when opening
        // Focus management: focus the close button or the modal itself
        closeModalButton.focus();
        document.addEventListener('keydown', handleEscapeKey);
    }

    function closeModal() {
        videoModal.style.display = 'none'; // Or use a class: videoModal.classList.remove('is-open');
        videoModal.setAttribute('hidden', 'true');
        videoIframe.src = ""; // Stop video by clearing src
        document.removeEventListener('keydown', handleEscapeKey);
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }

    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    // Trap focus within the modal
    // Basic focus trapping, for more robust solutions consider a library or more detailed implementation
    modalContent.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            const focusableElements = modalContent.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        }
    });


    if (playVideoButton) {
        playVideoButton.addEventListener('click', openModal);
    }
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal); // Close on overlay click
    }


    // Form Submission Functionality
    const materialForm = document.getElementById('material-form');
    if (materialForm) {
        materialForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission

            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const telefoneInput = document.getElementById('telefone');

            const nome = nomeInput.value.trim();
            const email = emailInput.value.trim();
            const telefone = telefoneInput.value.trim();

            // Basic validation
            if (!nome || !email || !telefone) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Email validation regex (simple)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }

            // Phone validation (simple - just checks if it's not empty, can be improved)
            if (telefone.length < 8) { // Basic check for length
                 alert('Por favor, insira um número de telefone válido.');
                return;
            }


            const message = `material enviado:
Nome: ${nome}
Email: ${email}
Telefone: ${telefone}`;

            alert(message);

            // Optionally, clear the form
            // materialForm.reset();
            nomeInput.value = '';
            emailInput.value = '';
            telefoneInput.value = '';
        });
    }
});
