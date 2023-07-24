// Calculate the size of each grid cell
var gridSize = 100; // Adjust as needed

// Define the image URLs as an array
var imageUrls = [
  "rechteck.svg",
  "kreis1.svg",
  "kreis2.svg",
  "kreis3.svg",
  "kreis4.svg",
  "big_1.svg",
  "rechteck_1.svg",
  "kreis1_1.svg",
  "kreis2_1.svg",
  "kreis3_1.svg",
  "kreis4_1.svg",
  "big_1_1.svg",
  // Add more image URLs here if needed
];

// Function to generate random position
function getRandomPosition() {
  var randomX = Math.floor(Math.random() * 10) * gridSize;
  var randomY = Math.floor(Math.random() * 10) * gridSize;
  return { x: randomX, y: randomY };
}

// Function to add an image to the grid
function addImageToGrid(imageUrl) {
  var image = new Image();
  image.src = imageUrl;
  image.classList.add('grid-item');
  image.style.position = 'absolute';

  // Function to check collision with existing positions
  function checkCollisionWithExistingPositions(newImage) {
    var gridItems = document.querySelectorAll('.grid-item');
    var newRect = newImage.getBoundingClientRect();

    for (var i = 0; i < gridItems.length; i++) {
      var item = gridItems[i];
      var itemRect = item.getBoundingClientRect();

      // Check if the new image collides with any existing image
      if (
        newRect.left < itemRect.right &&
        newRect.right > itemRect.left &&
        newRect.top < itemRect.bottom &&
        newRect.bottom > itemRect.top
      ) {
        // Check if the new image is the big image and adjust the collision check accordingly
        if (
          newImage.src.endsWith('big_1.svg') &&
          (item.style.width === '200px' || item.style.height === '100px')
        ) {
          return true; // Collision detected
        }
      }
    }

    return false; // No collision
  }

  // Generate a new random position for the image if it collides with existing images
  var position;
  var collisionDetected = true;
  var collisionAttempts = 0;
  while (collisionDetected && collisionAttempts < 10) {
    if (imageUrl.endsWith('big_1.svg') || imageUrl.endsWith('big_1_1.svg')) {
      position = getRandomPosition();
      // Ensure big images fit within the grid
      position.x = Math.min(position.x, gridSize * 8);
      position.y = Math.min(position.y, gridSize * 8);
      image.style.width = '200px';
      image.style.height = '100px';
      image.style.left = position.x + 'px';
      image.style.top = position.y + 'px';
    } else {
      position = getRandomPosition();
      image.style.left = position.x + 'px';
      image.style.top = position.y + 'px';
    }

    collisionDetected = checkCollisionWithExistingPositions(image);
    collisionAttempts++;
  }

  // Enable draggability and snapping for the image
  interact(image)
    .draggable({
      snap: {
        targets: [
          interact.createSnapGrid({
            x: gridSize,
            y: gridSize,
            offset: { x: gridSize / 2, y: gridSize / 2 } // Adjust the offset to center the images within the grid cells
          })
        ],
        range: Infinity,
        relativePoints: [{ x: 0, y: 0 }]
      },
      inertia: true,
      restrict: {
        restriction: '.grid', // Restrict dragging within the grid
        endOnly: true // Only apply restrictions at the end of dragging
      }
    })
    .on('dragmove', function (event) {
      var target = event.target;

      // Calculate the new position based on the grid cell size
      var x = Math.floor((parseFloat(target.getAttribute('data-x')) || 0) / gridSize + event.dx / gridSize) * gridSize;
      var y = Math.floor((parseFloat(target.getAttribute('data-y')) || 0) / gridSize + event.dy / gridSize) * gridSize;

      // Apply the position to the dragged element
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

      // Store the updated position on the element's attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    })
    .on('dragstart', function (event) {
      var target = event.target;

      // Store the current rotation angle in a data attribute
      var style = window.getComputedStyle(target);
      var transform = style.getPropertyValue('transform');
      var match = transform.match(/rotate\(([^)]+)\)/);
      var rotation = match ? parseFloat(match[1]) : 0;
      target.setAttribute('data-rotation', rotation);
    });

  // Append the image to the grid
  document.querySelector('.grid').appendChild(image);
}

// Generate random number of images between 15 and 20
var totalImages = Math.floor(Math.random() * 6) + 15; // Random number between 15 and 20
for (var i = 0; i < totalImages; i++) {
  var randomImageIndex = Math.floor(Math.random() * imageUrls.length);
  addImageToGrid(imageUrls[randomImageIndex]);
}

// Function to download the grid as an image
function downloadGrid() {
  // Convert SVG images to base64 data URLs
  var svgs = document.querySelectorAll('.grid svg');
  svgs.forEach(function(svg) {
    var dataURL = "data:image/svg+xml;base64," + window.btoa(new XMLSerializer().serializeToString(svg));
    svg.setAttribute('data-image', dataURL); // Save the data URL in a custom attribute for later restoration
    svg.src = dataURL; // Set the SVG image source to the data URL
  });

  // Convert the grid content to an image using dom-to-image
  domtoimage.toBlob(document.querySelector('.grid')).then(function(blob) {
    // Save the Blob as a file using FileSaver.js
    saveAs(blob, 'pattern.png');

    // Restore the original SVG images
    svgs.forEach(function(svg) {
      var dataURL = svg.getAttribute('data-image');
      svg.src = dataURL;
    });
  });
}

// Attach event listener to the Download Grid button
document.getElementById('downloadBtn').addEventListener('click', function() {
  downloadGrid();
});