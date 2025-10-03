document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeElement = button.previousElementSibling;
            const codeToCopy = codeElement.innerText;

            const textArea = document.createElement('textarea');
            textArea.value = codeToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                button.textContent = 'Copied!';
                button.classList.add('bg-green-600', 'hover:bg-green-600');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                button.textContent = 'Error';
                button.classList.add('bg-red-600', 'hover:bg-red-600');
            }
            document.body.removeChild(textArea);

            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('bg-green-600', 'hover:bg-green-600', 'bg-red-600', 'hover:bg-red-600');
            }, 2000);
        });
    });
});
