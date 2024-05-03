const images = [
  "1.png", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpg", "6.jpg"
];

let activeImage = 0;
const sliderPlace = document.querySelector('.slider__line');
let flag = true;
const imageWidth = document.querySelector('.slider').clientWidth;
sliderPlace.style.width = 3 * imageWidth + 'px'
sliderPlace.style.heigth = imageWidth + 'px'
sliderPlace.style.left = '-' + imageWidth + 'px'


const initSlider = () => {
  const img = document.createElement('img');
  img.alt = '';
  img.src = 'images/' + images[activeImage]
  sliderPlace.append(img)
  nextImage();
  prevImage();
}

const nextImage = () => {
  let nextImage = activeImage + 1;
  if (nextImage >= images.length) nextImage = 0
  const img = document.createElement('img');
  img.alt = '';
  img.src = 'images/' + images[nextImage]
  sliderPlace.append(img)
}

const prevImage = (w = false) => {
  let prevImage = activeImage - 1;
  if (prevImage < 0) prevImage = images.length - 1;
  const img = document.createElement('img');
  img.alt = '';
  img.src = 'images/' + images[prevImage]
  if (w) img.style.width = 0;
  sliderPlace.prepend(img);
}

initSlider();

const prevSlide = () => {
  if (!flag) return;
  flag = !flag;
  activeImage--; ;
  if (activeImage < 0) activeImage = images.length - 1;
  // document.querySelector('.slider__line img:last-child').remove()
  prevImage(true);
  animate({duration: 1000,
    draw : function(progress) {
      document.querySelector('.slider__line img').style.width = (imageWidth * progress) + 'px'
    }, removeElement : document.querySelector('.slider__line img:last-child')})
}

const nextSlide = () => {
  if (!flag) return;
  flag = !flag;
  activeImage++ ;
  if (activeImage >= images.length) activeImage = 0;
  // document.querySelector('.slider__line img').remove();
  nextImage();
  animate({duration: 1000,
  draw : function(progress) {
    document.querySelector('.slider__line img').style.width = imageWidth * (1-progress) + 'px'
  }, removeElement : document.querySelector('.slider__line img')})
}

document.querySelector('.prev-btn').addEventListener('click', prevSlide)
document.querySelector('.next-btn').addEventListener('click', nextSlide)

const animate = ({duration, draw, removeElement}) => {
  const start = performance.now();
  requestAnimationFrame(function animate(time){
    let step = (time - start) / duration;
    if (step > 1) step = 1;
    draw(step);
    if (step < 1) {
      requestAnimationFrame(animate)
    } else {
      removeElement.remove();
      flag = true;
    }
  })
}
