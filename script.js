const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API

let count = 5;
const apiKey = "nrIwg6zqXKtB1vruXPOiHPq-AEU__Fxi_tEbKlKlBZ8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper Function to Set Attributes on DOM Elements

function setAttribute(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links and Photos, Add to DOM

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photoArray
    photosArray.forEach((photo) => {
    //   Create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <image> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <image> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

// Check to see if scrolling near bottom of the page, Load more photos.
window.addEventListener("scroll", () => {
    console.log('innerHeight', window.innerHeight);
    console.log('scrollY',window.scrollY);
    console.log('OffsetHeigh',document.body.offsetHeight)
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
        console.log('loadmore')
    }
})

// On Load
getPhotos();