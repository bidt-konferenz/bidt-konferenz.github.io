// Calculate the size of each grid cell
var gridSize = 100; // Adjust as needed

// Store the sidebar images in an array
var sidebarImages = Array.from(document.querySelectorAll('.sidebar-image'));

// Function to generate random position
function getRandomPosition() {
  var randomX = Math.floor(Math.random() * 10) * gridSize;
  var randomY = Math.floor(Math.random() * 10) * gridSize;
  return { x: randomX, y: randomY };
}

// Function to generate random position for big image
function getRandomPositionForBigImage() {
  var randomX = Math.floor(Math.random() * 9 + 1) * gridSize; // Random X position between 1 and 9
  var randomY = Math.floor(Math.random() * 9 + 1) * gridSize; // Random Y position between 1 and 9
  return { x: randomX, y: randomY };
}

// Function to add an image to the grid
function addImageToGrid(image) {
  // Clone the clicked image
  var clone = image.cloneNode(true);
  clone.classList.remove('sidebar-image');
  clone.classList.add('grid-item');
  clone.style.position = 'absolute';

  // Adjust size and position if the added image is big_1.svg
  if (image.src.endsWith('big_1.svg')) {
    var position = getRandomPositionForBigImage();
    clone.style.width = '200px';
    clone.style.height = '100px';
    clone.style.left = position.x + 'px';
    clone.style.top = position.y + 'px';
  } else {
    var position = getRandomPosition();
    clone.style.left = position.x + 'px';
    clone.style.top = position.y + 'px';
  }

  if (!checkCollision(clone)) {
    // Enable draggability and snapping for the cloned item
    interact(clone)
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

    // Append the cloned image to the grid
    document.querySelector('.grid').appendChild(clone);
  }
}

// Function to check collision with existing positions
function checkCollision(newImage) {
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
        (item.style.width === '100px' || item.style.height === '50px')
      ) {
        return true; // Collision detected
      }
    }
  }

  return false; // No collision
}

// Add click event listener to each sidebar image
sidebarImages.forEach(function (image) {
  image.addEventListener('click', function () {
    addImageToGrid(this);
  });
});

// Generate initial grid images
var initialImageCount = 10; // Adjust as needed
for (var i = 0; i < initialImageCount; i++) {
  var randomImageIndex = Math.floor(Math.random() * sidebarImages.length);
  addImageToGrid(sidebarImages[randomImageIndex]);
}
