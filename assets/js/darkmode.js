document.addEventListener('DOMContentLoaded', (event) => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const lightIcon = document.getElementById('lightIcon');
  const darkIcon = document.getElementById('darkIcon');

  function setDarkMode(isDark) {
    body.classList.toggle('dark-mode', isDark);
    lightIcon.style.display = isDark ? 'none' : 'inline';
    darkIcon.style.display = isDark ? 'inline' : 'none';
    localStorage.setItem('darkMode', isDark);
  }

  darkModeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    setDarkMode(!body.classList.contains('dark-mode'));
  });

  // Check for saved dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  setDarkMode(savedDarkMode);
});