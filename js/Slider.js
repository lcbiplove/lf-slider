function Slider(imageWrapperId, hold = 4000, transitionTime = 400) {
  const IMAGE_WIDTH = 800;
  const IMAGE_HEIGHT = 600;

  this.transitionTime = transitionTime;
  this.hold = hold;

  this.sliderIndex = 1;
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

  /**
   * Animate slides to destination slide index
   *
   * @param {int} fromIndex
   * @param {int} toIndex
   */
  this.animate = (fromIndex, toIndex) => {
    const distance = (toIndex - fromIndex) * IMAGE_WIDTH;

    // Expected pixels move per 20ms
    const pxPerTwentyMS = (distance / this.transitionTime) * 20;

    let moved = 0;
    const currentTranslateX = fromIndex * IMAGE_WIDTH;
    const interval = setInterval(() => {
      moved += pxPerTwentyMS;

      this.carouselImageContainer.style.transform = `translateX(-${
        currentTranslateX + moved
      }px) translateZ(0)`;

      if (distance === moved) {
        this.onAnimationEnd();

        clearInterval(interval);
      }
    }, 20); // Animation runs every 20ms
  };

  /**
   * There is no slide in next direction
   * @returns {boolean}
   */
  this.isNextEnd = () => {
    return this.sliderIndex + 2 > this.slidesCount;
  };

  /**
   * There is no slide in previous direction
   * @returns {boolean}
   */
  this.isPrevEnd = () => {
    return this.sliderIndex <= 0;
  };

  /**
   * Next Button
   */
  this.next.onclick = () => {
    if (this.isNextEnd()) return;

    this.indicators.forEach(elem => {
      elem.classList.remove("active");
    });

    let index = this.sliderIndex >= this.slidesCount - 2 ? 0 : this.sliderIndex;
    this.indicators[index].className = "active";

    this.sliderIndex++;

    this.animate(this.sliderIndex - 1, this.sliderIndex);
  };

  /**
   * Previous Button
   */
  this.prev.onclick = () => {
    if (this.isPrevEnd()) return;

    this.indicators.forEach(elem => {
      elem.classList.remove("active");
    });

    let index =
      this.sliderIndex === 1 ? this.slidesCount - 3 : this.sliderIndex - 2;
    this.indicators[index].className = "active";

    this.sliderIndex--;

    this.animate(this.sliderIndex + 1, this.sliderIndex);
  };

  /**
   * When animation ends
   */
  this.onAnimationEnd = () => {
    // When the slider reached the cloned last element
    const currentSlide = this.carouselImageContainer.children[this.sliderIndex];
    if (currentSlide.id === clonedLastImage.id) {
      this.carouselImageContainer.style.transition = "none";
      this.sliderIndex = this.slidesCount - 2;
      this.animate(this.sliderIndex, this.sliderIndex);
    }

    if (currentSlide.id === clonedFirstImage.id) {
      this.carouselImageContainer.style.transition = "none";
      this.sliderIndex = this.slidesCount - this.sliderIndex;
      this.animate(this.sliderIndex, this.sliderIndex);
    }
  };

  /**
   * Dots creations and event listener
   */

  const dotsWrapper = document.createElement("div");
  dotsWrapper.className = "carousel-indicators";

  this.indicators = [];
  for (let ind = 0; ind < this.slidesCount - 2; ind++) {
    let dot = document.createElement("span");
    dotsWrapper.appendChild(dot);
    this.indicators.push(dot);

    dot.onclick = () => {
      // Check if slide of current dot is shown
      if (this.sliderIndex === ind + 1) return;

      this.indicators.forEach(elem => {
        elem.classList.remove("active");
      });
      this.sliderIndex = ind + 1;

      this.animate(this.sliderIndex - 1, this.sliderIndex);

      dot.className = "active";
    };
  }
  // Show active status to initial slide
  this.indicators[0].className = "active";
  this.carouselContainer.appendChild(dotsWrapper);
}
