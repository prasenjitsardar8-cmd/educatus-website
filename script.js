function toggleMenu(){
  document.getElementById('mainNav').classList.toggle('open');
}

document.querySelectorAll('#mainNav a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mainNav').classList.remove('open');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
