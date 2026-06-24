const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.querySelectorAll('.produto-card').forEach(card => {
  const imgs = card.querySelectorAll('.produto-imagens img');
  const dots = card.querySelectorAll('.dot');

  if (imgs.length <=1) return;

  let atual = 0;

  imgs.forEach((img, i) => {
    img.style.display = i === 0 ? 'block' : 'none';
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {

      imgs[atual].style.display = 'none';
      dots[atual].classList.remove('ativa');

      atual = i;

      imgs[atual].style.display = 'block';
      dots[atual].classList.add('ativa');
    })
  })
})