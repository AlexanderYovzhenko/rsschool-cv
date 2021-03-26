const warningWindowButton = document.querySelector('.warning-window-button');
const warningWindow = document.querySelector('.warning-window');


//closes warning window
function closesWarningWindow() {
    warningWindowButton.addEventListener('click', () => {
        warningWindow.style.display = 'none';
    });
}


closesWarningWindow();
