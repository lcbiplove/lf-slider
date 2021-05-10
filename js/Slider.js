function Slider(
  imageWrapperId,
  hold = 4000,
  transitionTime = 400,
  transitionStyle = "linear"
) {
  const IMAGE_WIDTH = 800;
  const IMAGE_HEIGHT = 600;

  this.sliderNumber = 1;
  this.carouselImageContainer = document.getElementById(`${imageWrapperId}`);
  this.carouselContainer = this.carouselImageContainer.parentElement;

  const arrowsWrapper = document.createElement("div");
  arrowsWrapper.className = "carousel-controls";

  this.prev = document.createElement("button");
  this.prev.innerHTML = "<";

  this.next = document.createElement("button");
  this.next.innerHTML = ">";

  arrowsWrapper.appendChild(this.prev);
  arrowsWrapper.appendChild(this.next);
  this.carouselContainer.appendChild(arrowsWrapper);

  /* Cloned first and last images are for infinite in forward direction looping 
  slides */
  const clonedFirstImage = this.carouselImageContainer.firstElementChild.cloneNode();
  clonedFirstImage.id = "cloned-first";

  const clonedLastImage = this.carouselImageContainer.lastElementChild.cloneNode();
  clonedLastImage.id = "cloned-last";

  this.carouselImageContainer.append(clonedFirstImage);
  this.carouselImageContainer.prepend(clonedLastImage);

  // Hide cloned lastImage to left side
  this.carouselImageContainer.style.transform = `translateX(-800px) translateZ(0)`;
  this.slidesCount = this.carouselImageContainer.childElementCount;

  /* Is Next limit reached? */
  this.isNextEnd = () => {
    return this.sliderNumber >= this.slidesCount;
  };

  /* Is Previous limit reached? */
  this.isPrevEnd = () => {
    return this.sliderNumber <= 0;
  };

  /* Next button */
  this.next.onclick = () => {
    if (this.isNextEnd()) return;

    this.indicators.forEach(elem => {
      elem.classList.remove("active");
    });

    let index =
      this.sliderNumber >= this.slidesCount - 2 ? 0 : this.sliderNumber;
    this.indicators[index].className = "active";

    this.sliderNumber++;

    this.carouselImageContainer.style.transform = `translateX(-${
      IMAGE_WIDTH * this.sliderNumber
    }px) translateZ(0)`;
    this.carouselImageContainer.style.transition = `transform ${transitionTime}ms ${transitionStyle}`;
  };

  /* Previous button */
  this.prev.onclick = () => {
    if (this.isPrevEnd()) return;

    this.indicators.forEach(elem => {
      elem.classList.remove("active");
    });

    let index =
      this.sliderNumber === 1 ? this.slidesCount - 3 : this.sliderNumber - 2;
    this.indicators[index].className = "active";

    this.sliderNumber--;

    this.carouselImageContainer.style.transform = `translateX(-${
      IMAGE_WIDTH * this.sliderNumber
    }px) translateZ(0)`;
    this.carouselImageContainer.style.transition = `transform ${transitionTime}ms ${transitionStyle}`;
  };

  this.carouselImageContainer.ontransitionend = () => {
    // When the slider reached the cloned last element
    if (
      this.carouselImageContainer.children[this.sliderNumber].id ===
      clonedLastImage.id
    ) {
      this.carouselImageContainer.style.transition = "none";
      this.sliderNumber = this.slidesCount - 2;
      this.carouselImageContainer.style.transform = `translateX(${
        -IMAGE_WIDTH * this.sliderNumber
      }px)`;
    }

    if (
      this.carouselImageContainer.children[this.sliderNumber].id ===
      clonedFirstImage.id
    ) {
      this.carouselImageContainer.style.transition = "none";
      this.sliderNumber = 1;
      this.carouselImageContainer.style.transform = `translateX(${
        -IMAGE_WIDTH * this.sliderNumber
      }px)`;
    }
  };

  const dotsWrapper = document.createElement("div");
  dotsWrapper.className = "carousel-indicators";

  this.indicators = [];
  for (let ind = 0; ind < this.slidesCount - 2; ind++) {
    let dot = document.createElement("span");
    dotsWrapper.appendChild(dot);
    this.indicators.push(dot);

    dot.onclick = () => {
      this.indicators.forEach(elem => {
        elem.classList.remove("active");
      });

      this.carouselImageContainer.style.transform = `translateX(${
        -IMAGE_WIDTH * (ind + 1)
      }px)`;
      this.carouselImageContainer.style.transition = `transform ${transitionTime}ms ${transitionStyle}`;

      dot.className = "active";

      this.sliderNumber++;
    };
  }
  // Show active status to initial slide
  this.indicators[0].className = "active";
  this.carouselContainer.appendChild(dotsWrapper);
}
