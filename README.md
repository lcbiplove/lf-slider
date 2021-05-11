# Slider 

##### It is the carousel writter in pure Javascript.

* [Demo](https://lcbiplove.github.io/lf-slider/)


## Features

* Animation through Javascript
* Slides in forward infinite direction
* Dots indicators
* Buttons to control slides
* Multiple slides


## Installation

You can install the Slider on your site by:

1. Link to css:
```html
<link rel="stylesheet" href="slider.css">

```
2. Write HTML for building slider:
```html
    <div class="carousel-container">
        <div id="first-slider" class="carousel-image-wrapper">
          <img src="images/image1.jpg" alt="Image" />
          <img src="images/image2.jpg" alt="Image" />
          <img src="images/image3.jpg" alt="Image" />
          <img src="images/image4.jpg" alt="Image" />
          <img src="images/image5.jpg" alt="Image" />
        </div>
    </div>    
```
3. Link to js:
```html
    <script src="Slider.js"></script>
```

4. Initialize Slider. It expect `id`, `hold`, `transitionTime`, `autoplay`:
```javascript
new Slider("first-slider", 4000, 400, true);
```



