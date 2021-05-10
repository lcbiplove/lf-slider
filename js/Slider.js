function Slider(
  imageWrapperId,
  hold = 4000,
  transitionTime = 400,
  transitionStyle = "linear"
) {
  const IMAGE_WIDTH = 800;
  const IMAGE_HEIGHT = 600;

  this.sliderIndex = 0;
  this.carouselImageContainer = document.getElementById(`${imageWrapperId}`);
  this.carouselImageContainer.style.width = this.slidesCount * IMAGE_WIDTH;
  this.carouselContainer = this.carouselImageContainer.parentElement;

  this.slidesCount = this.carouselImageContainer.childElementCount;

  const arrowsWrapper = document.createElement("div");
  arrowsWrapper.className = "carousel-controls";

  this.prev = document.createElement("button");
  this.prev.innerHTML = "<";

  this.next = document.createElement("button");
  this.next.innerHTML = ">";

  arrowsWrapper.appendChild(this.prev);
  arrowsWrapper.appendChild(this.next);
  this.carouselContainer.appendChild(arrowsWrapper);

  const dotsWrapper = document.createElement("div");
  dotsWrapper.className = "carousel-indicators";

  this.indicators = [];
  for (let ind = 0; ind < this.slidesCount; ind++) {
    let dot = document.createElement("span");
    dotsWrapper.appendChild(dot);
    this.indicators.push(dot);
  }

  this.carouselContainer.appendChild(dotsWrapper);

  this.isNextEnd = () => {
    return (
      IMAGE_WIDTH * (this.sliderIndex + 1) > this.slidesCount * IMAGE_WIDTH
    );
  };

  this.isPrevEnd = () => {
    return this.sliderIndex === -1;
  };

  this.carouselImageContainer.ontransitionend = () => {
    console.log(this);
    if (this.isNextEnd()) {
    }
  };

  this.next.onclick = () => {
    this.sliderIndex++;
    if (this.isNextEnd()) {
      this.sliderIndex = 0;
    }

    this.carouselImageContainer.style.transform = `translateX(-${
      IMAGE_WIDTH * this.sliderIndex
    }px) translateZ(0)`;
    this.carouselImageContainer.style.transition = `transform ${transitionTime}ms ${transitionStyle}`;
  };

  this.prev.onclick = () => {
    this.sliderIndex--;
    if (this.isPrevEnd()) {
      this.sliderIndex = this.slidesCount - 1;
    }

    this.carouselImageContainer.style.transform = `translateX(-${
      IMAGE_WIDTH * this.sliderIndex
    }px) translateZ(0)`;
    this.carouselImageContainer.style.transition = `transform ${transitionTime}ms ${transitionStyle}`;
  };
}
