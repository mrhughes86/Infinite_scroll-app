const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready  = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = '02abY_mwLOBzjPz4O_EZ6ZJxEBW5Xx4a51fKqQ07rDM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  } 
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run Function for each object in photosArray
  photosArray.forEach((photo) => {
  // Create <a> to link to Unsplash
  const item = document.createElement('a');
  setAttributes(item, {
    href: photo.links.html,
    taget: '_blank',
  });
  // Create <img> for photo
  const img = document.createElement('img');
  setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description,
  });

  // Event Listener, check when each is finished loading
  img.addEventListener('load', imageLoaded());
  
  // Put <img> inside <a>, then put both inside imageContainer Element
  item.appendChild(img);
  imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch(error) {
    //Catch error here
  }
}

// Scroll bar loads more images
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    getPhotos();
  }
})

// On Load
getPhotos();

