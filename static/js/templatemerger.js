
// Array to store the loaded PNGs
const loadedPNGs = [];

const fileInput = document.getElementById('file-input');
const previewArea = document.getElementById('preview-area');
const exportButton = document.getElementById('export-button');

// Add event listeners to the file input and export button
fileInput.addEventListener('change', handleFileInputChange);
exportButton.addEventListener('click', handleExportButtonClick);



// Function to change through formats
document.querySelector("#desk-plates").addEventListener("click", function () {  
  const dropdown = document.querySelector("#format-btn");  
  dropdown.innerText = "Desk Plates";  
  generatePreview();  
});  

document.querySelector("#flutes").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Flutes";
  generatePreview();
});

document.querySelector("#stanly-tags").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Stanly Tags";
  generatePreview();
});

document.querySelector("#golfballs").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Golfballs";
  generatePreview();
});

document.querySelector("#bookmarks").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Bookmarks";
  generatePreview();
});

document.querySelector("#mugs").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Mugs";
  generatePreview();
});

document.querySelector("#planks-66").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Planks 6X6";
  generatePreview();
});
document.querySelector("#planks-88").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Planks 8X8";
  generatePreview();
});
document.querySelector("#planks-1010").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Planks 10X10";
  generatePreview();
});
document.querySelector("#planks-1212").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Planks 12X12";
  generatePreview();
});
document.querySelector("#planks-186").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Planks 18X6";
  generatePreview();
});
document.querySelector("#planks-2412").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Planks 24X12";
  generatePreview();
});
document.querySelector("#planks-2412-THICK").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Planks 24X12 THICK";
  generatePreview();
});

document.querySelector("#mats-3624-colormats").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Mats 36X24 Colored Mats";
  generatePreview();
});
document.querySelector("#mats-3020-colormats").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Mats 30x20 Colored Mats";
  generatePreview();
});
document.querySelector("#mats-3018-colormats").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Mats 30x18 Colored Mats";
  generatePreview();
});
document.querySelector("#mats-2416-colormats").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Mats 24x16 Colored Mats";
  generatePreview();
});
document.querySelector("#mats-1812-colormats").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Mats 18x12 Colored Mats";
  generatePreview();
});
document.querySelector("#CB-1117").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board 1117";
  generatePreview();
});
document.querySelector("#CB-1117-groove").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board 1117 groove";
  generatePreview();
});
document.querySelector("#CB-0812").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board 0812";
  generatePreview();
});
document.querySelector("#CB-0812-groove").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board 0812 groove";
  generatePreview();
});
document.querySelector("#CB-1108").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board 1108";
  generatePreview();
});
document.querySelector("#CB-0806").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board 0806";
  generatePreview();
});
document.querySelector("#CB-1114-bamboo").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board 1114 bamboo";
  generatePreview();
});
document.querySelector("#CB-8511-bamboo").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board 8511 bamboo";
  generatePreview();
});
document.querySelector("#CB-PDCB-thick").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board PDCB";
  generatePreview();
});
document.querySelector("#CB-PD-thin-1206").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board PD thin 1206";
  generatePreview();
});
document.querySelector("#CB-PD-thin-1507").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board PD thin 1507";
  generatePreview();
});
document.querySelector("#CB-BAMBOO-HAN511").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "CB BAMBOO HAN511";
  generatePreview();
});
document.querySelector("#CB-COC-board").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "Cutting board COC board";
  generatePreview();
});
document.querySelector("#WSKDCT-CAP").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "WSKDCT CAP";
  generatePreview();
});
document.querySelector("#WSKDCT-KSL").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "WSKDCT KSL";
  generatePreview();
});
document.querySelector("#SKTPAD").addEventListener("click", function () {
  const dropdown = document.querySelector("#format-btn");
  dropdown.innerText = "SKTPAD";
  generatePreview();
});





// template preview 
// Handle file input change event
function handleFileInputChange(event) {
  previewArea.innerHTML = '';
  loadedPNGs.length = 0;
  const files = event.target.files;
  let counter = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();

      img.onload = function () {
        loadedPNGs.push(img);
        counter++;
        if (counter === files.length) {
          generatePreview();
        }
      };

      img.src = e.target.result;
      previewArea.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}

function handleExportButtonClick() {

  // DESK PLATES

  if (document.querySelector("#format-btn").innerText === "Desk Plates") {

    const files = document.getElementById('file-input').files;
    if (files.length > 28) {
      alert('Error: You can only select up to 28 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 24;
      const canvasHeightinches = 36;
      const dpi72 = 72.01558002 * 5;
      const canvasWidth = canvasWidthInches * dpi72;
      const canvasHeight = canvasHeightinches * dpi72;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // [x, y]
            [1.03, 0.93],   [15.38, 0.93],  [1.03, 3.446],  [15.38, 3.446],
           [1.03, 5.962],  [15.38, 5.962],  [1.03, 8.478],  [15.38, 8.478],
          [1.03, 10.994], [15.38, 10.994],  [1.03, 13.51],  [15.38, 13.51],
          [1.03, 16.026], [15.38, 16.026], [1.03, 18.542], [15.38, 18.542],
          [1.03, 21.058], [15.38, 21.058], [1.03, 23.574], [15.38, 23.574],
           [1.03, 26.09],  [15.38, 26.09], [1.03, 28.606], [15.38, 28.606],
          [1.03, 31.122], [15.38, 31.122], [1.03, 33.638], [15.38, 33.638],
          [1.03, 36.154], [15.38, 36.154]
        ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi72;
          y = positions[i][1] * dpi72;
          width = 8.08 * dpi72;
          height = 2 * dpi72;
        } else {
          x = i % 2 === 0 ? canvasWidth - (8 * dpi72) : canvasWidth / 24;
          y = Math.floor((i - 1) / 2) * (2 * dpi72) + canvasHeight / 36;
          width = 8.08 * dpi72;
          height = 2 * dpi72;
        }


        if (i < 28) {
          ctx.save();
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI);
          ctx.scale(-1, 1);
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);
          ctx.restore();
        } else {
          ctx.drawImage(loadedPNG, x, y, width, height);
        }
      }
      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'desk_plates.png';
      link.click();
    }, 100);
  }


  // FLUTES

  else if (document.querySelector("#format-btn").innerText === "Flutes") {

    const files = document.getElementById('file-input').files;
    if (files.length > 10) {
      alert('Error: You can only select up to 10 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const canvasWidthInches = 18.504;
      const canvasHeightinches = 18.504;
      const dpi72 = 70.05406617 * 10;
      const canvasWidth = canvasWidthInches * dpi72;
      const canvasHeight = canvasHeightinches * dpi72;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // [x, y]
           [2.25, 0.95],  [11.35, 0.95], [2.25, 4.75], [11.35, 4.75],
           [2.25, 8.55],  [11.35, 8.55], [2.25, 12.35], [11.35, 12.35],
          [2.25, 16.15], [11.35, 16.15],
        ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi72;
          y = positions[i][1] * dpi72;
          width = 4.5 * dpi72;
          height = 1.5 * dpi72;
        } else {
          x = i % 2 === 0 ? canvasWidth - (8 * dpi72) : canvasWidth / 18.504;
          y = Math.floor((i - 1) / 2) * (2 * dpi72) + canvasHeight / 18.504;
          width = 4.5 * dpi72;
          height = 1.5 * dpi72;
        }

        if (i < 10) {
          ctx.save();
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI);
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);
          ctx.restore();
        } else {
          ctx.drawImage(loadedPNG, x, y, width, height);
        }
      }

      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'flutes.png';
      link.click();
    }, 100);
  }

  // STANLY TAGS

  else if (document.querySelector("#format-btn").innerText === "Stanly Tags") {

    const files = document.getElementById('file-input').files;
    if (files.length > 44) {
      alert('Error: You can only select up to 44 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const canvasWidthInches = 18.504;
      const canvasHeightinches = 18.504;
      const dpi72 = 70.05406617 * 10;
      const canvasWidth = canvasWidthInches * dpi72;
      const canvasHeight = canvasHeightinches * dpi72;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // [x, y]
            [0.95, 0.41],   [5.6, 0.41],  [10.25, 0.41],  [14.9, 0.41],
            [0.95, 1.71],   [5.6, 1.71],  [10.25, 1.71],  [14.9, 1.71],
            [0.95, 3.01],   [5.6, 3.01],  [10.25, 3.01],  [14.9, 3.01],
            [0.95, 4.31],   [5.6, 4.31],  [10.25, 4.31],  [14.9, 4.31],
            [0.95, 5.61],   [5.6, 5.61],  [10.25, 5.61],  [14.9, 5.61],
            [0.95, 6.91],   [5.6, 6.91],  [10.25, 6.91],  [14.9, 6.91],
            [0.95, 8.21],   [5.6, 8.21],  [10.25, 8.21],  [14.9, 8.21],
           [0.95, 9.51],  [5.6, 9.51], [10.25, 9.51], [14.9, 9.51],
           [0.95, 10.81],  [5.6, 10.81], [10.25, 10.81], [14.9, 10.81],
           [0.95, 12.11],  [5.6, 12.11], [10.25, 12.11], [14.9, 12.11],
           [0.95, 13.41],  [5.6, 13.41], [10.25, 13.41], [14.9, 13.41],
        ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi72;
          y = positions[i][1] * dpi72;
          width = 2.4 * dpi72;
          height = 1.3 * dpi72;
        } else {
          x = i % 2 === 0 ? canvasWidth - (8 * dpi72) : canvasWidth / 18.504;
          y = Math.floor((i - 1) / 2) * (2 * dpi72) + canvasHeight / 18.504;
          width = 2.4 * dpi72;
          height = 1.3 * dpi72;
        }

        if (i < 44) {
          ctx.save();
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI);
          ctx.scale(-1, 1);
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);
          ctx.restore();
        } else {
          ctx.drawImage(loadedPNG, x, y, width, height);
        }
      }

      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'stanly-tags.png';
      link.click();
    }, 100);
  }

  // GOLFBALLS

  else if (document.querySelector("#format-btn").innerText === "Golfballs") {

    const files = document.getElementById('file-input').files;
    if (files.length > 260) {
      alert('Error: You can only select up to 260 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const canvasWidthInches = 24;
      const canvasHeightinches = 36;
      const dpi72 = 72.01558002 * 5;
      const canvasWidth = canvasWidthInches * dpi72;
      const canvasHeight = canvasHeightinches * dpi72;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];


        const positions = [ // [x, y]
           [0.58, 0.88],  [2.40, 0.88],  [4.21, 0.88],  [6.03, 0.88],  [7.84, 0.88],  [9.67, 0.88],  [11.47, 0.88],  [13.29, 0.88],  [15.10, 0.88],  [16.92, 0.88],  [18.73, 0.88],  [20.55, 0.88] , [22.36, 0.88],
           [0.58, 2.66],  [2.40, 2.66],  [4.21, 2.66],  [6.03, 2.66],  [7.84, 2.66],  [9.67, 2.66],  [11.47, 2.66],  [13.29, 2.66],  [15.10, 2.66],  [16.92, 2.66],  [18.73, 2.66],  [20.55, 2.66],  [22.36, 2.66],
           [0.58, 4.43],  [2.40, 4.43],  [4.21, 4.43],  [6.03, 4.43],  [7.84, 4.43],  [9.67, 4.43],  [11.47, 4.43],  [13.29, 4.43],  [15.10, 4.43],  [16.92, 4.43],  [18.73, 4.43],  [20.55, 4.43],  [22.36, 4.43],
           [0.58, 6.21],  [2.40, 6.21],  [4.21, 6.21],  [6.03, 6.21],  [7.84, 6.21],  [9.67, 6.21],  [11.47, 6.21],  [13.29, 6.21],  [15.10, 6.21],  [16.92, 6.21],  [18.73, 6.21],  [20.55, 6.21],  [22.36, 6.21],
           [0.58, 7.98],  [2.40, 7.98],  [4.21, 7.98],  [6.03, 7.98],  [7.84, 7.98],  [9.67, 7.98],  [11.47, 7.98],  [13.29, 7.98],  [15.10, 7.98],  [16.92, 7.98],  [18.73, 7.98],  [20.55, 7.98],  [22.36, 7.98],
           [0.58, 9.76],  [2.40, 9.76],  [4.21, 9.76],  [6.03, 9.76],  [7.84, 9.76],  [9.67, 9.76],  [11.47, 9.76],  [13.29, 9.76],  [15.10, 9.76],  [16.92, 9.76],  [18.73, 9.76],  [20.55, 9.76],  [22.36, 9.76],
           [0.58, 11.53], [2.40, 11.53], [4.21, 11.53], [6.03, 11.53], [7.84, 11.53], [9.67, 11.53], [11.47, 11.53], [13.29, 11.53], [15.10, 11.53], [16.92, 11.53], [18.73, 11.53], [20.55, 11.53], [22.36, 11.53],
           [0.58, 13.31], [2.40, 13.31], [4.21, 13.31], [6.03, 13.31], [7.84, 13.31]  [9.67, 13.31], [11.47, 13.31], [13.29, 13.31], [15.10, 13.31], [16.92, 13.31], [18.73, 13.31], [20.55, 13.31], [22.36, 13.31],
           [0.58, 15.08], [2.40, 15.08], [4.21, 15.08], [6.03, 15.08], [7.84, 15.08], [9.67, 15.08], [11.47, 15.08], [13.29, 15.08], [15.10, 15.08], [16.92, 15.08], [18.73, 15.08], [20.55, 15.08], [22.36, 15.08],
           [0.58, 16.86], [2.40, 16.86], [4.21, 16.86], [6.03, 16.86], [7.84, 16.86], [9.67, 16.86], [11.47, 16.86], [13.29, 16.86], [15.10, 16.86], [16.92, 16.86], [18.73, 16.86], [20.55, 16.86], [22.36, 16.86],
           [0.58, 18.63], [2.40, 18.63], [4.21, 18.63], [6.03, 18.63], [7.84, 18.63], [9.67, 18.63], [11.47, 18.63], [13.29, 18.63], [15.10, 18.63]  [16.92, 18.63], [18.73, 18.63], [20.55, 18.63], [22.36, 18.63],
           [0.58, 20.41], [2.40, 20.41], [4.21, 20.41], [6.03, 20.41], [7.84, 20.41], [9.67, 20.41], [11.47, 20.41], [13.29, 20.41], [15.10, 20.41], [16.92, 20.41], [18.73, 20.41], [20.55, 20.41], [22.36, 20.41],
           [0.58, 22.18], [2.40, 22.18], [4.21, 22.18], [6.03, 22.18], [7.84, 22.18], [9.67, 22.18], [11.47, 22.18], [13.29, 22.18], [15.10, 22.18], [16.92, 22.18], [18.73, 22.18], [20.55, 22.18], [22.36, 22.18],
           [0.58, 23.96], [2.40, 23.96], [4.21, 23.96], [6.03, 23.96], [7.84, 23.96], [9.67, 23.96], [11.47, 23.96], [13.29, 23.96], [15.10, 23.96], [16.92, 23.96], [18.73, 23.96], [20.55, 23.96], [22.36, 23.96],
           [0.58, 25.73], [2.40, 25.73], [4.21, 25.73], [6.03, 25.73], [7.84, 25.73], [9.67, 25.73], [11.47, 25.73], [13.29, 25.73], [15.10, 25.73], [16.92, 25.73]  [18.73, 25.73], [20.55, 25.73], [22.36, 25.73],
           [0.58, 27.51], [2.40, 27.51], [4.21, 27.51], [6.03, 27.51], [7.84, 27.51], [9.67, 27.51], [11.47, 27.51], [13.29, 27.51], [15.10, 27.51], [16.92, 27.51], [18.73, 27.51], [20.55, 27.51], [22.36, 27.51],
           [0.58, 29.28], [2.40, 29.28], [4.21, 29.28], [6.03, 29.28], [7.84, 29.28], [9.67, 29.28], [11.47, 29.28], [13.29, 29.28], [15.10, 29.28], [16.92, 29.28], [18.73, 29.28], [20.55, 29.28], [22.36, 29.28],
           [0.58, 31.06], [2.40, 31.06], [4.21, 31.06], [6.03, 31.06], [7.84, 31.06], [9.67, 31.06], [11.47, 31.06], [13.29, 31.06], [15.10, 31.06], [16.92, 31.06], [18.73, 31.06], [20.55, 31.06], [22.36, 31.06],
           [0.58, 32.83], [2.40, 32.83]  [4.21, 32.83], [6.03, 32.83], [7.84, 32.83], [9.67, 32.83], [11.47, 32.83], [13.29, 32.83], [15.10, 32.83], [16.92, 32.83], [18.73, 32.83], [20.55, 32.83], [22.36, 32.83],
           [0.58, 34.61], [2.40, 34.61], [4.21, 34.61], [6.03, 34.61], [7.84, 34.61], [9.67, 34.61], [11.47, 34.61], [13.29, 34.61], [15.10, 34.61], [16.92, 34.61], [18.73, 34.61], [20.55, 34.61], [22.36, 34.61],
        ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi72;
          y = positions[i][1] * dpi72;
          width = .94 * dpi72;
          height = .94 * dpi72;
        } else {
          x = i % 2 === 0 ? canvasWidth - (8 * dpi72) : canvasWidth / 24;
          y = Math.floor((i - 1) / 2) * (2 * dpi72) + canvasHeight / 36;
          width = .94 * dpi72;
          height = .94 * dpi72;
        }

        if (i < 260) {
          ctx.drawImage(loadedPNG, x, y, width, height);
        }
      }

      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'golfballs.png';
      link.click();
    }, 100);
  }

  // BOOKMARKS

  else if (document.querySelector("#format-btn").innerText === "Bookmarks") {

    const files = document.getElementById('file-input').files;
    if (files.length > 14) {
      alert('Error: You can only select up to 14 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const canvasWidthInches = 18.504;
      const canvasHeightinches = 18.504;
      const dpi72 = 70.05406617 * 10;
      const canvasWidth = canvasWidthInches * dpi72;
      const canvasHeight = canvasHeightinches * dpi72;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // [x, y]
        [1.1, 0.45],  [12.4, 0.45],
        [1.1, 2.98],  [12.4, 2.98],
        [1.1, 5.51],  [12.4, 5.51],
        [1.1, 8.04],  [12.4, 8.04],
        [1.1, 10.57], [12.4, 10.57],
        [1.1, 13.1],  [12.4, 13.1],
        [1.1, 15.63], [12.4, 15.63],
        ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi72;
          y = positions[i][1] * dpi72;
          width = 5.3 * dpi72;
          height = 2 * dpi72;
        } else {
          x = i % 2 === 0 ? canvasWidth - (8 * dpi72) : canvasWidth / 18.504;
          y = Math.floor((i - 1) / 2) * (2 * dpi72) + canvasHeight / 18.504;
          width = 5.3 * dpi72;
          height = 2 * dpi72;
        }

        if (i < 14) {
          ctx.save();
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI);
          ctx.scale(-1, 1);
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);
          ctx.restore();
        } else {
          ctx.drawImage(loadedPNG, x, y, width, height);
        }
      }
      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'bookmarks.png';
      link.click();
    }, 100);
  }

  // MUGS

 else if (document.querySelector("#format-btn").innerText === "Mugs") {

  const files = document.getElementById('file-input').files;
  if (files.length > 30) {
    alert('Error: You can only select up to 30 images.');
    return;
  }
  generatePreview();
  setTimeout(() => {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const canvasWidthInches = 49.606;
    const canvasHeightinches = 23.425;
    const dpi72 = 70.05406617 * 5;
    const canvasWidth = canvasWidthInches * dpi72;
    const canvasHeight = canvasHeightinches * dpi72;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // set background to white  
    ctx.fillStyle = "white";  
    ctx.fillRect(0, 0, canvas.width, canvas.height); 

    for (let i = 0; i < loadedPNGs.length; i++) {
      const loadedPNG = loadedPNGs[i];

      const positions = [ // [x, y]
      [4.9, 18.752], [13.168, 18.752], [21.436, 18.752], [29.704, 18.752], [37.972, 18.752], [46.24, 18.752],
      [4.9, 14.064], [13.168, 14.064], [21.436, 14.064], [29.704, 14.064], [37.972, 14.064], [46.24, 14.064],
      [4.9, 9.376],  [13.168, 9.376],  [21.436, 9.376],  [29.704, 9.376],  [37.972, 9.376],  [46.24, 9.376],
      [4.9, 4.688],  [13.168, 4.688],  [21.436, 4.688],  [29.704, 4.688],  [37.972, 4.688],  [46.24, 4.688],
      [4.9, 0],      [13.168, 0],      [21.436, 0],      [29.704, 0],      [37.972, 0],      [46.24, 0],
    ];

      let x, y, width, height;
      if (i < positions.length) {
        x = positions[i][0] * dpi72;
        y = positions[i][1] * dpi72;
        width = 3 * dpi72;
        height = 4.688 * dpi72;
      } else {
        x = i % 2 === 0 ? canvasWidth - (8 * dpi72) : canvasWidth / 49.606;
        y = Math.floor((i - 1) / 2) * (2 * dpi72) + canvasHeight / 23.425;
        width = 3 * dpi72;
        height = 4.688 * dpi72;
      }

      if (i < 30) {
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        // ctx.rotate(Math.PI);
        ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);
        ctx.restore();
      } else {
        ctx.drawImage(loadedPNG, x, y, width, height);
      }
    }
    canvas.toBlob((blob) => {  
    const link = document.createElement('a');  
    link.href = URL.createObjectURL(blob);  
    link.download = 'mugs.jpg';  
    link.click();  
    }, 'image/jpeg', 1);  
  }, 100);
}

  
  // JEWELRY
  function generateJewelryCanvas(numFilesLimit, fileName) {
    const files = document.getElementById('file-input').files;
    if (files.length > numFilesLimit) {
      alert(`Error: You can only select up to ${numFilesLimit} images.`);
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const canvasWidthInches = 24;
      const dpi72 = 72.01558002 * 5;
      const canvasWidth = canvasWidthInches * dpi72;

      const numRows = Math.ceil(loadedPNGs.length / 2);

      const paddingY = 100;
      const canvasHeight = numRows * (loadedPNGs[0].height + paddingY) + paddingY;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col * (canvasWidth / 2);
        const y = row * (loadedPNG.height + paddingY) + paddingY;
        ctx.drawImage(loadedPNG, x, y, loadedPNG.width, loadedPNG.height);
      }
      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);

      // Create a download link for the Blob  
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    }, 100);
  }

  // RINGS

  if (document.querySelector("#format-btn").innerText === "Rings") {
    generateJewelryCanvas(50, 'rings.png');
  }

  // NCK01 

  else if (document.querySelector("#format-btn").innerText === "One Name Necklace") {
    generateJewelryCanvas(50, 'NCK01.png');
  }

  // NCK02 

  else if (document.querySelector("#format-btn").innerText === "Two Name Necklace") {
    generateJewelryCanvas(35, 'NCK02.png');
  }

  // NCK03  

  else if (document.querySelector("#format-btn").innerText === "Three Name Necklace") {
    generateJewelryCanvas(20, 'NCK03.png');
  }

  // NCK04 

  else if (document.querySelector("#format-btn").innerText === "Four Name Necklace") {
    generateJewelryCanvas(20, 'NCK04.png');
  }

  // Planks
  // 6X6

  if (document.querySelector("#format-btn").innerText === "Planks 6X6") {
    const files = document.getElementById('file-input').files;
    if (files.length > 42) {
      alert('Error: You can only select up to 42 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 54.37;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [
          [0.81, 0.91], [8.597, 0.91], [16.3, 0.91], [24.03, 0.91], [31.77, 0.91], [39.51, 0.91], [47.25, 0.91],
          [0.81, 8.9], [8.597, 8.9], [16.3, 8.9], [24.03, 8.9], [31.77, 8.9], [39.51, 8.9], [47.25, 8.9],
          [0.81, 16.88], [8.597, 16.88], [16.3, 16.88], [24.03, 16.88], [31.77, 16.88], [39.51, 16.88], [47.25, 16.88],
          [0.81, 24.87], [8.597, 24.87], [16.3, 24.87], [24.03, 24.87], [31.77, 24.87], [39.51, 24.87], [47.25, 24.87],
          [0.81, 32.86], [8.597, 32.86], [16.3, 32.86], [24.03, 32.86], [31.77, 32.86], [39.51, 32.86], [47.25, 32.86],
          [0.81, 40.86], [8.597, 40.86], [16.3, 40.86], [24.03, 40.86], [31.77, 40.86], [39.51, 40.86], [47.25, 40.86],       
        ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 6.3 * dpi;
          height = 6.3 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (6.3 * dpi) : canvasWidth / 54.37;
          y = Math.floor((i - 1) / 2) * (6.3 * dpi) + canvasHeight / 48.503;
          width = 6.3 * dpi;
          height = 6.3 * dpi;
        }

        if (i < 42) {  
          ctx.save(); 
          ctx.translate(x + width / 2, y + height / 2);
          ctx.scale(-1, -1); 
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);
          ctx.restore();
        }  
      }
      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'planks_(6X6).png';
      link.click();
    }, 100);
  }

  // 8X8  

  if (document.querySelector("#format-btn").innerText === "Planks 8X8") {
    const files = document.getElementById('file-input').files;
    if (files.length > 36) {
      alert('Error: You can only select up to 36 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 95.99;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [
          [1.20, 1.24],   [11.15, 1.24],  [21.09, 1.24], [31.04, 1.24], [40.98, 1.24], [50.93, 1.24],
          [60.88, 1.24], [70.83, 1.24], [80.78, 1.24], 
          
          [1.20, 11.17],   [11.15, 11.17],  [21.09, 11.17], [31.04, 11.17], [40.98, 11.17], [50.93, 11.17],
          [60.88, 11.17], [70.83, 11.17], [80.78, 11.17], 
          
          [1.20, 21.11],   [11.15, 21.11],  [21.09, 21.11], [31.04, 21.11], [40.98, 21.11], [50.93, 21.11],
          [60.88, 21.11], [70.83, 21.11], [80.78, 21.11], 
          
          [1.20, 31.04],   [11.15, 31.04],  [21.09, 31.04], [31.04, 31.04], [40.98, 31.04], [50.93, 31.04],
          [60.88, 31.04], [70.83, 31.04], [80.78, 31.04],       
          

        ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 8.3 * dpi;
          height = 8.3 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (8.3 * dpi) : canvasWidth / 54.37;
          y = Math.floor((i - 1) / 2) * (8.3 * dpi) + canvasHeight / 48.503;
          width = 8.3 * dpi;
          height = 8.3 * dpi;
        }

        if (i < 36) {
          ctx.save(); 
          ctx.translate(x + width / 2, y + height / 2);
          ctx.scale(-1, -1); 
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);
          ctx.restore();
        }
      }
      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'planks_(8X8).png';
      link.click();
    }, 100);
  }

  // 10x10

  if (document.querySelector("#format-btn").innerText === "Planks 10X10") {
    const files = document.getElementById('file-input').files;
    if (files.length > 28) {
      alert('Error: You can only select up to 28 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 95.99;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [
          [1.2, 0.97],   [13.44, 0.97], [25.69, 0.97], [37.94, 0.97], [50.19, 0.97],
          [62.44, 0.97], [74.69, 0.97],     
          
          [1.2, 13.08],   [13.44, 13.08], [25.69, 13.08], [37.94, 13.08], [50.19, 13.08],
          [62.44, 13.08], [74.69, 13.08], 

          [1.2, 25.18],   [13.44, 25.18], [25.69, 25.18], [37.94, 25.18], [50.19, 25.18],
          [62.44, 25.18], [74.69, 25.18],    
          
          [1.2, 37.3],   [13.44, 37.3], [25.69, 37.3], [37.94, 37.3], [50.19, 37.3],
          [62.44, 37.3], [74.69, 37.3], 
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 10.3 * dpi;
          height = 10.3 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (10.3 * dpi) : canvasWidth / 95.99;
          y = Math.floor((i - 1) / 2) * (10.3 * dpi) + canvasHeight / 48.503;
          width = 10.3 * dpi;
          height = 10.3 * dpi;
        }

        if (i < 28) {  
          ctx.save(); 
          ctx.translate(x + width / 2, y + height / 2);
          ctx.scale(-1, -1); 
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);
          ctx.restore();  
        }  
      }  
      const dataURL = canvas.toDataURL('image/png', 1);  
      const blob = dataURLToBlob(dataURL);  
      const link = document.createElement('a');  
      link.href = URL.createObjectURL(blob);  
      link.download = 'planks_(10X10).png';  
      link.setAttribute('download', 'planks_(10X10).png');  
      document.body.appendChild(link); 
      link.click();  
      document.body.removeChild(link); 
    }, 100);  
  }  

  // 12x12 

  if (document.querySelector("#format-btn").innerText === "Planks 12X12") {
    const files = document.getElementById('file-input').files;
    if (files.length > 18) {
      alert('Error: You can only select up to 18 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 95.99;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [
          [.83, 0.86],  [14.86, 0.86], [28.88, 0.86], [42.9, 0.86],
          [56.92, 0.86], [70.94, 0.86],         
          
          [.83, 15.1],  [14.86, 15.1], [28.88, 15.1], [42.9, 15.1],
          [56.92, 15.1], [70.94, 15.1],          
          
          [.83, 29.23],  [14.86, 29.23], [28.88, 29.23], [42.9, 29.23],
          [56.92, 29.23], [70.94, 29.23],
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 12.3 * dpi;
          height = 12.3 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (12.3 * dpi) : canvasWidth / 95.99;
          y = Math.floor((i - 1) / 2) * (12.3 * dpi) + canvasHeight / 48.503;
          width = 12.3 * dpi;
          height = 12.3 * dpi;
        }

        if (i < 18) {
          ctx.save(); 
          ctx.translate(x + width / 2, y + height / 2);
          ctx.scale(-1, -1); 
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);
          ctx.restore();
        }
      }
      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'planks_(12X12).png';
      link.click();
    }, 100);
  }

  // 18X6

  if (document.querySelector("#format-btn").innerText === "Planks 18X6") {
    const files = document.getElementById('file-input').files;
    if (files.length > 40) {
      alert('Error: You can only select up to 40 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 95.99;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [
          
          [1.5, .5], [20.5, .5], [39.5, .5], [58.5, .5], [77.5, .5],
          [1.5, 6.5], [20.5, 6.5], [39.5, 6.5], [58.5, 6.5], [77.5, 6.5],
          [1.5, 12.5], [20.5, 12.5], [39.5, 12.5], [58.5, 12.5], [77.5, 12.5],
          [1.5, 18.5], [20.5, 18.5], [39.5, 18.5], [58.5, 18.5], [77.5, 18.5],
          [1.5, 24.5], [20.5, 24.5], [39.5, 24.5], [58.5, 24.5], [77.5, 24.5],
          [1.5, 30.5], [20.5, 30.5], [39.5, 30.5], [58.5, 30.5], [77.5, 30.5],
          [1.5, 36.5], [20.5, 36.5], [39.5, 36.5], [58.5, 36.5], [77.5, 36.5],
          [1.5, 42.5], [20.5, 42.5], [39.5, 42.5], [58.5, 42.5], [77.5, 42.5],          
        ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 17.65 * dpi;
          height = 5.65 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (17.65 * dpi) : canvasWidth / 95.99;
          y = Math.floor((i - 1) / 2) * (5.65 * dpi) + canvasHeight / 48.503;
          width = 17.65* dpi;
          height = 5.65 * dpi;
        }

        if (i < 40) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);  
          ctx.rotate(Math.PI); // Rotate by 180 degrees  
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'planks_(18X6).png';
      link.click();
    }, 100);
  }

  // 24x12

  if (document.querySelector("#format-btn").innerText === "Planks 24X12") {
    const files = document.getElementById('file-input').files;
    if (files.length > 9) {
      alert('Error: You can only select up to 9 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 95.99;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [
          [.99, .91], [27.03, .91], [53.07, .91],      
          
          [.99, 15.51], [27.03, 15.51], [53.07, 15.51],

          [.99, 30.11], [27.03, 30.11], [53.07, 30.11]
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 24.3 * dpi;
          height = 12.3 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (24.3 * dpi) : canvasWidth / 95.99;
          y = Math.floor((i - 1) / 2) * (12.3 * dpi) + canvasHeight / 48.503;
          width = 24.3 * dpi;
          height = 12.3 * dpi;
        }

        if (i < 9) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI); // Rotate by 180 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'planks_(24X12).png';
      link.click();
    }, 100);
  }

  // 24x12 THICK

  if (document.querySelector("#format-btn").innerText === "Planks 24X12 THICK") {
    const files = document.getElementById('file-input').files;
    if (files.length > 9) {
      alert('Error: You can only select up to 9 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 95.99;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [
          [.99, .91], [27.03, .91], [53.07, .91],      
          
          [.99, 15.51], [27.03, 15.51], [53.07, 15.51],

          [.99, 30.11], [27.03, 30.11], [53.07, 30.11]
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 22.75 * dpi;
          height = 10.75 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (22.75 * dpi) : canvasWidth / 95.99;
          y = Math.floor((i - 1) / 2) * (10.75 * dpi) + canvasHeight / 48.503;
          width = 22.75 * dpi;
          height = 10.75 * dpi;
        }

        if (i < 9) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI); // Rotate by 180 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      const dataURL = canvas.toDataURL('image/png', 1);
      const blob = dataURLToBlob(dataURL);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'planks_(24X12).png';
      link.click();
    }, 100);
  }
  
  
  


    // MATS 24x36 photoshop

    if (document.querySelector("#format-btn").innerText === "Mats 24X36") {
      const files = document.getElementById('file-input').files;
      if (files.length > 3) {
        alert('Error: You can only select up to 3 images.');
        return;
      }
      generatePreview();
      setTimeout(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const canvasWidthInches = 95.99;
        const canvasHeightinches = 48.503;
        const dpi = 300; // 300 DPI for print resolution  
        const canvasWidth = canvasWidthInches * dpi;
        const canvasHeight = canvasHeightinches * dpi;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        for (let i = 0; i < loadedPNGs.length; i++) {
          const loadedPNG = loadedPNGs[i];
  
          const positions = [ // x-y
            [3.7, 5], [29.94, 5], [56.13, 5]
                 
            ];
  
          let x, y, width, height;
          if (i < positions.length) {
            x = positions[i][0] * dpi;
            y = positions[i][1] * dpi;
            width = 36.3 * dpi;
            height = 24.3 * dpi;
          } else {
            x = i % 2 === 0 ? canvasWidth - (36.3 * dpi) : canvasWidth / 95.99;
            y = Math.floor((i - 1) / 2) * (24.3 * dpi) + canvasHeight / 48.503;
            width = 36.3 * dpi;
            height = 24.3 * dpi;
          }
  
          if (i < 3) {  
            ctx.save();  
            ctx.translate(x + width / 2, y + height / 2);
            ctx.rotate(Math.PI / 2); // Rotate by 90 degrees
            ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
            ctx.restore();  
          } else {  
            ctx.drawImage(loadedPNG, x, y, width, height);  
          } 
        }
        const dataURL = canvas.toDataURL('image/png', 1);
        const blob = dataURLToBlob(dataURL);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'mats_(24X36).png';
        link.click();
      }, 100);
    }


  // MATS 36x24 Color Mats

  if (document.querySelector("#format-btn").innerText === "Mats 36X24 Colored Mats") {
    const files = document.getElementById('file-input').files;
    if (files.length > 4) {
      alert('Error: You can only select up to 4 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 95.99;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Set background color to white
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [10, 0], [50, 0],
          [10, 24.3], [50, 24.3]
               
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 36.3 * dpi;
          height = 24.3 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (36.3 * dpi) : canvasWidth / 95.99;
          y = Math.floor((i - 1) / 2) * (24.3 * dpi) + canvasHeight / 48.503;
          width = 36.3 * dpi;
          height = 24.3 * dpi;
        }

        if (i < 4) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      canvas.toBlob((blob) => {  
        const link = document.createElement('a');  
        link.href = URL.createObjectURL(blob);  
        link.download = 'mats_(24X36).jpg';  
        link.click();  
        }, 'image/jpeg', 1);  
      }, 100);
  }



  // MATS 30x20 Color Mats

  if (document.querySelector("#format-btn").innerText === "Mats 30x20 Colored Mats") {
    const files = document.getElementById('file-input').files;
    if (files.length > 6) {
      alert('Error: You can only select up to 6 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 95.99;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Set background color to white
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [1, 2], [32.5, 2], [64, 2],
          [1, 24], [32.5, 24], [64, 24]
              
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 30.3 * dpi;
          height = 20.3 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (30.3 * dpi) : canvasWidth / 95.99;
          y = Math.floor((i - 1) / 2) * (20.3 * dpi) + canvasHeight / 48.503;
          width = 30.3 * dpi;
          height = 20.3 * dpi;
        }

        if (i < 6) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      canvas.toBlob((blob) => {  
        const link = document.createElement('a');  
        link.href = URL.createObjectURL(blob);  
        link.download = 'mats_(24X36).jpg';  
        link.click();  
        }, 'image/jpeg', 1);  
      }, 100);
  }




  // MATS 30x18 Color Mats

  if (document.querySelector("#format-btn").innerText === "Mats 30x18 Colored Mats") {
    const files = document.getElementById('file-input').files;
    if (files.length > 8) {
      alert('Error: You can only select up to 8 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 95.99;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Set background color to white
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [-5.5, 6], [13.5, 6], [32.5, 6], [51.5, 6], [70.5, 6], 
          [-5.5, 18.38], [26, 18.38], [57.5, 18.38]
          
               
          ];

          let x, y, width, height;


          if (i < positions.length) {
              x = positions[i][0] * dpi;
              y = positions[i][1] * dpi;
              width = 30.2 * dpi;
              height = 18.2 * dpi;
            if (i === 5) {
              width = 30.2 * dpi;
              height = 18.2 * dpi;
              // Set x and y positions specifically for horizontal
              y = (i === 5) ? 30.3 * dpi : 60 * dpi; // Same y for 6 and 7
              x = (i === 5) ? .5 * dpi : (i === 6 ? 30 * dpi : 55 * dpi);
              }
              if (i === 6) {
                width = 30.2 * dpi;
                height = 18.2 * dpi;
                // Set x and y positions specifically for horizontal
                y = (i === 6) ? 30.3 * dpi : 60 * dpi; // Same y for 6 and 7
                x = (i === 6) ? 32.5 * dpi : (i === 7 ? 30 * dpi : 55 * dpi);
              }
              if (i === 7) {
                width = 30.2 * dpi;
                height = 18.2 * dpi;
                // Set x and y positions specifically for horizontal
                y = (i === 7) ? 30.3 * dpi : 60 * dpi; // Same y for 6 and 7
                x = (i === 7) ? 64.5 * dpi : (i === 8 ? 30 * dpi : 55 * dpi);
              }
          }

        if (i < 8) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);

          if (i >= 5) {
            ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          } else {
            ctx.rotate(Math.PI / 2); // Rotate by 90 degrees
          }

          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      canvas.toBlob((blob) => {  
        const link = document.createElement('a');  
        link.href = URL.createObjectURL(blob);  
        link.download = 'mats_(30X18).jpg';  
        link.click();  
        }, 'image/jpeg', 1);  
      }, 100);
  }





  // MATS 24x16 Color Mats

  if (document.querySelector("#format-btn").innerText === "Mats 24x16 Colored Mats") {
    const files = document.getElementById('file-input').files;
    if (files.length > 10) {
      alert('Error: You can only select up to 10 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 95.99;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Set background color to white
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [-1.613, 4.02], [16.96, 4.02], [35.533, 4.02], [54.106, 4.02], [71.679, 4.02],
          [-1.613, 28.25], [16.96, 28.25], [35.533, 28.25], [54.106, 28.25], [71.679, 28.25]
               
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 24.3 * dpi;
          height = 16.3 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (24.3 * dpi) : canvasWidth / 95.99;
          y = Math.floor((i - 1) / 2) * (16.3 * dpi) + canvasHeight / 48.503;
          width = 24.3 * dpi;
          height = 16.3 * dpi;
        }

        if (i < 10) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI / 2); // Rotate by 90 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      canvas.toBlob((blob) => {  
        const link = document.createElement('a');  
        link.href = URL.createObjectURL(blob);  
        link.download = 'mats_(24X16).jpg';  
        link.click();  
        }, 'image/jpeg', 1);  
      }, 100);
  }



  // MATS 18x12 Color Mats

  if (document.querySelector("#format-btn").innerText === "Mats 18x12 Colored Mats") {
    const files = document.getElementById('file-input').files;
    if (files.length > 14) {
      alert('Error: You can only select up to 14 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 95.99;
      const canvasHeightinches = 48.503;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Set background color to white
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [-1.5, 10], [11.8, 10], [25.1, 10], [38.4, 10], [51.8, 10], [65, 10], [78.3, 10],
          [-1.5, 30], [11.8, 30], [25.1, 30], [38.4, 30], [51.8, 30], [65, 30], [78.3, 30]
              
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 18.3 * dpi;
          height = 12.3 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (18.3 * dpi) : canvasWidth / 95.99;
          y = Math.floor((i - 1) / 2) * (12.3 * dpi) + canvasHeight / 48.503;
          width = 18.3 * dpi;
          height = 12.3 * dpi;
        }

        if (i < 14) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI / 2); // Rotate by 90 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      canvas.toBlob((blob) => {  
        const link = document.createElement('a');  
        link.href = URL.createObjectURL(blob);  
        link.download = 'mats_(18X12).jpg';  
        link.click();  
        }, 'image/jpeg', 1);  
      }, 100);
  }


  // CB 1117

  if (document.querySelector("#format-btn").innerText === "Cutting board 1117") {
    const files = document.getElementById('file-input').files;
    if (files.length > 4) {
      alert('Error: You can only select up to 4 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [1, 1.05], [19, 1.05],
          [1, 13.05], [19, 13.05]
              
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 17 * dpi;
          height = 11 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (17 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (11 * dpi) + canvasHeight / 28;
          width = 17 * dpi;
          height = 11 * dpi;
        }

        if (i < 4) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('CB 1117.pdf');  // Name of the PDF file
    }, 100);
}

  // CB 1117 groove

  if (document.querySelector("#format-btn").innerText === "Cutting board 1117 groove") {
    const files = document.getElementById('file-input').files;
    if (files.length > 4) {
      alert('Error: You can only select up to 4 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [2.1, 2.1], [20, 2.1],  
          [2.1, 14.15], [20, 14.15]
              
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 14.9 * dpi;
          height = 8.9 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (14.9 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (8.9 * dpi) + canvasHeight / 28;
          width = 14.9 * dpi;
          height = 8.9 * dpi;
        }

        if (i < 4) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('CB 1117 groove.pdf');  // Name of the PDF file
    }, 100);
}

  // CB 0812

  if (document.querySelector("#format-btn").innerText === "Cutting board 0812") {
    const files = document.getElementById('file-input').files;
    if (files.length > 9) {
      alert('Error: You can only select up to 9 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [.6, .7], [13.42, .7], [26.21, .7],
          [.6, 9.55], [13.42, 9.55], [26.21, 9.55],
          [.6, 18.45], [13.42, 18.45], [26.21, 18.45]
          
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 12 * dpi;
          height = 8 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (12 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (8 * dpi) + canvasHeight / 28;
          width = 12 * dpi;
          height = 8 * dpi;
        }

        if (i < 9) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }

      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('CB 0812');  // Name of the PDF file
    }, 100);
}
  // CB 0812 groove

  if (document.querySelector("#format-btn").innerText === "Cutting board 0812 groove") {
    const files = document.getElementById('file-input').files;
    if (files.length > 9) {
      alert('Error: You can only select up to 9 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [1.7, 1.75], [14.42, 1.75], [27.14, 1.75],
          [1.7, 10.65], [14.42, 10.65], [27.14, 10.65],
          [1.7, 19.55], [14.42, 19.55], [27.14, 19.55]
          
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 9.9 * dpi;
          height = 5.9 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (9.9 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (5.9 * dpi) + canvasHeight / 28;
          width = 9.9 * dpi;
          height = 5.9 * dpi;
        }

        if (i < 9) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('CB 0812 groove.pdf');  // Name of the PDF file
    }, 100);
}

  // CB 1108

  if (document.querySelector("#format-btn").innerText === "Cutting board 1108") {
    const files = document.getElementById('file-input').files;
    if (files.length > 9) {
      alert('Error: You can only select up to 9 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [1, 1], [12.95, 1], [25, 1],
          [1, 9.675], [12.95, 9.675], [25, 9.675],
          [1, 18.35], [12.95, 18.35], [25, 18.35]
          
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 11.1 * dpi;
          height = 7.775 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (11.1 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (7.775 * dpi) + canvasHeight / 28;
          width = 11.1 * dpi;
          height = 7.775 * dpi;
        }

        if (i < 9) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('CB 1108.pdf');  // Name of the PDF file
    }, 100);
}


  // CB 0806

  if (document.querySelector("#format-btn").innerText === "Cutting board 0806") {
    const files = document.getElementById('file-input').files;
    if (files.length > 16) {
      alert('Error: You can only select up to 16 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [1.17, .55], [10.05, .55], [18.97, .55], [27.9, .55],
          [1.17, 7.05], [10.05, 7.05], [18.97, 7.05], [27.9, 7.05],
          [1.17, 13.55], [10.05, 13.55], [18.97, 13.55], [27.9, 13.55],
          [1.17, 20.05], [10.05, 20.05], [18.97, 20.05], [27.9, 20.05]
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 8 * dpi;
          height = 6 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (8 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (6 * dpi) + canvasHeight / 28;
          width = 8 * dpi;
          height = 6 * dpi;
        }

        if (i < 16) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('CB 0806.pdf');  // Name of the PDF file
    }, 100);
}


  // CB 1114 bamboo

  if (document.querySelector("#format-btn").innerText === "Cutting board 1114 bamboo") {
    const files = document.getElementById('file-input').files;
    if (files.length > 4) {
      alert('Error: You can only select up to 4 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [1, 1.05], [15.9, 1.05],
          [1, 13], [15.9, 13],
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 14 * dpi;
          height = 11 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (14 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (11 * dpi) + canvasHeight / 28;
          width = 14 * dpi;
          height = 11 * dpi;
        }

        if (i < 4) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('CB 1114 bamboo.pdf');  // Name of the PDF file
    }, 100);
}




// CB 8511 bamboo

if (document.querySelector("#format-btn").innerText === "Cutting board 8511 bamboo") {
  const files = document.getElementById('file-input').files;
  if (files.length > 9) {
    alert('Error: You can only select up to 9 images.');
    return;
  }
  generatePreview();
  setTimeout(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidthInches = 40;
    const canvasHeightinches = 28;
    const dpi = 300; // 300 DPI for print resolution  
    const canvasWidth = canvasWidthInches * dpi;
    const canvasHeight = canvasHeightinches * dpi;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    for (let i = 0; i < loadedPNGs.length; i++) {
      const loadedPNG = loadedPNGs[i];

      const positions = [ // x-y
        [.82, .7], [13.6, .7], [26.35, .7],
        [.82, 9.6], [13.6, 9.6], [26.35, 9.6],
        [.82, 18.5], [13.6, 18.5], [26.35, 18.5]
        ];

      let x, y, width, height;
      if (i < positions.length) {
        x = positions[i][0] * dpi;
        y = positions[i][1] * dpi;
        width = 11 * dpi;
        height = 8.5 * dpi;
      } else {
        x = i % 2 === 0 ? canvasWidth - (11 * dpi) : canvasWidth / 40;
        y = Math.floor((i - 1) / 2) * (8.5 * dpi) + canvasHeight / 28;
        width = 11 * dpi;
        height = 8.5 * dpi;
      }

      if (i < 9) {  
        ctx.save();  
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
        ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
        ctx.restore();  
      } else {  
        ctx.drawImage(loadedPNG, x, y, width, height);  
      } 
    }
    // Use jsPDF to create a PDF from the canvas
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [canvasWidthInches, canvasHeightinches],
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or a lower value
    });

    // Add the canvas to the PDF
    pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
    pdf.save('CB 1114 bamboo.pdf');  // Name of the PDF file
  }, 100);
}



  // CB PDCB thick

  if (document.querySelector("#format-btn").innerText === "Cutting board PDCB") {
    const files = document.getElementById('file-input').files;
    if (files.length > 6) {
      alert('Error: You can only select up to 6 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight; 

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [1, 1], [19.5, 1],
          [1, 9.85], [19.5, 9.85],
          [1, 18.6], [19.5, 18.6]
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 17.5 * dpi;
          height = 7.85 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (17.5 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (7.85 * dpi) + canvasHeight / 28;
          width = 17.5 * dpi;
          height = 7.85 * dpi;
        }

        if (i < 6) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('CB PDCB thick.pdf');  // Name of the PDF file
    }, 100);
}


  // CB PD thin 1206

  if (document.querySelector("#format-btn").innerText === "Cutting board PD thin 1206") {
    const files = document.getElementById('file-input').files;
    if (files.length > 12) {
      alert('Error: You can only select up to 12 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [1, .5], [13.6, .5], [26.4, .5],
          [1, 7.25], [13.6, 7.25], [26.4, 7.25],
          [1, 14.1], [13.6, 14.1], [26.4, 14.1],
          [1, 20.8], [13.6, 20.8], [26.4, 20.8]
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 11.9 * dpi;
          height = 5.9 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (11.9 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (5.9 * dpi) + canvasHeight / 28;
          width = 11.9 * dpi;
          height = 5.9 * dpi;
        }

        if (i < 12) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('CB PD thin 1206.pdf');  // Name of the PDF file
    }, 100);
}

  // CB PD thin 1507

  if (document.querySelector("#format-btn").innerText === "Cutting board PD thin 1507") {
    const files = document.getElementById('file-input').files;
    if (files.length > 6) {
      alert('Error: You can only select up to 6 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [1, 1], [17, 1], 
          [1, 9], [17, 9], 
          [1, 17], [17, 17]
          
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 15 * dpi;
          height = 7 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (15 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (7 * dpi) + canvasHeight / 28;
          width = 15 * dpi;
          height = 7 * dpi;
        }

        if (i < 6) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('CB PD thin 1507.pdf');  // Name of the PDF file
    }, 100);
}

// CB-BAMBOO-HAN511

if (document.querySelector("#format-btn").innerText === "CB BAMBOO HAN511") {
  const files = document.getElementById('file-input').files;
  if (files.length > 12) {
    alert('Error: You can only select up to 12 images.');
    return;
  }
  generatePreview();
  setTimeout(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidthInches = 40;
    const canvasHeightinches = 28;
    const dpi = 300; // 300 DPI for print resolution  
    const canvasWidth = canvasWidthInches * dpi;
    const canvasHeight = canvasHeightinches * dpi;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    for (let i = 0; i < loadedPNGs.length; i++) {
      const loadedPNG = loadedPNGs[i];

      const positions = [ // x-y
        [1.397, 0.669], [14.028, 0.669], [26.718, 0.669],
        [1.397, 7.482], [14.028, 7.482], [26.718, 7.482],
        [1.397, 14.3], [14.028, 14.3], [26.718, 14.3],
        [1.397, 21.099], [14.028, 21.099], [26.718, 21.099]
        
        ];

      let x, y, width, height;
      if (i < positions.length) {
        x = positions[i][0] * dpi;
        y = positions[i][1] * dpi;
        width = 11.421 * dpi;
        height = 5.5 * dpi;
      } else {
        x = i % 2 === 0 ? canvasWidth - (11.421 * dpi) : canvasWidth / 40;
        y = Math.floor((i - 1) / 2) * (5.5 * dpi) + canvasHeight / 28;
        width = 11.421 * dpi;
        height = 5.5 * dpi;
      }

      if (i < 12) {  
        ctx.save();  
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
        ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
        ctx.restore();  
      } else {  
        ctx.drawImage(loadedPNG, x, y, width, height);  
      } 
    }
    // Use jsPDF to create a PDF from the canvas
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [canvasWidthInches, canvasHeightinches],
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or a lower value
    });

    // Add the canvas to the PDF
    pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
    pdf.save('CB BAMBOO HAN511.pdf');  // Name of the PDF file
  }, 100);
}


  // CB COC board

  if (document.querySelector("#format-btn").innerText === "Cutting board COC board") {
    const files = document.getElementById('file-input').files;
    if (files.length > 4) {
      alert('Error: You can only select up to 4 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [1, 1], [18, 1],
          [1, 11.45], [18, 11.45]
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 16 * dpi;
          height = 9.5 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (16 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (9.5 * dpi) + canvasHeight / 28;
          width = 16 * dpi;
          height = 9.5 * dpi;
        }

        if (i < 4) {  
          ctx.save();  
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
          ctx.restore();  
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('CB COC board.pdf');  // Name of the PDF file
    }, 100);
}


  // WSKDCT-CAP

  if (document.querySelector("#format-btn").innerText === "WSKDCT CAP") {
    const files = document.getElementById('file-input').files;
    if (files.length > 12) {
      alert('Error: You can only select up to 12 images.');
      return;
    }
    generatePreview();
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidthInches = 40;
      const canvasHeightinches = 28;
      const dpi = 300; // 300 DPI for print resolution  
      const canvasWidth = canvasWidthInches * dpi;
      const canvasHeight = canvasHeightinches * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      for (let i = 0; i < loadedPNGs.length; i++) {
        const loadedPNG = loadedPNGs[i];

        const positions = [ // x-y
          [2.7, .97], [12.6, .97], [22.6, .97], [32.56, .97],
          [2.7, 9.34], [12.6, 9.34], [22.6, 9.34], [32.56, 9.34],
          [2.7, 17.72], [12.6, 17.72], [22.6, 17.72], [32.56, 17.72]
          ];

        let x, y, width, height;
        if (i < positions.length) {
          x = positions[i][0] * dpi;
          y = positions[i][1] * dpi;
          width = 3 * dpi;
          height = 6 * dpi;
        } else {
          x = i % 2 === 0 ? canvasWidth - (3 * dpi) : canvasWidth / 40;
          y = Math.floor((i - 1) / 2) * (6 * dpi) + canvasHeight / 28;
          width = 3 * dpi;
          height = 6 * dpi;
        }

        if (i < 12) {  
          ctx.save();
          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);
          ctx.restore();
        } else {  
          ctx.drawImage(loadedPNG, x, y, width, height);  
        } 
      }
      // Use jsPDF to create a PDF from the canvas
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [canvasWidthInches, canvasHeightinches],
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or a lower value
      });

      // Add the canvas to the PDF
      pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
      pdf.save('WSKDCT CAP.pdf');  // Name of the PDF file
    }, 100);

    const url = 'path/to/your.pdf'; // Replace with the path to your PDF file

  // Asynchronously download PDF
  pdfjsLib.getDocument(url).promise.then(pdf => {
      // Fetch the first page
      pdf.getPage(1).then(page => {
          const scale = 1.5; // Adjust the scale as needed
          const viewport = page.getViewport({ scale });
  
          // Prepare canvas using PDF page dimensions
          const canvas = document.getElementById('pdf-canvas');
          const context = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
  
          // Render PDF page into canvas context
          const renderContext = {
              canvasContext: context,
              viewport: viewport
          };
          page.render(renderContext);
      });
  }).catch(error => {
      console.error('Error loading PDF: ', error);
  });
}

// WSKDCT-KSL

if (document.querySelector("#format-btn").innerText === "WSKDCT KSL") {
  const files = document.getElementById('file-input').files;
  if (files.length > 12) {
    alert('Error: You can only select up to 12 images.');
    return;
  }
  generatePreview();
  setTimeout(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidthInches = 40;
    const canvasHeightinches = 28;
    const dpi = 100; // 300 DPI for print resolution  
    const canvasWidth = canvasWidthInches * dpi;
    const canvasHeight = canvasHeightinches * dpi;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    for (let i = 0; i < loadedPNGs.length; i++) {
      const loadedPNG = loadedPNGs[i];

      const positions = [ // x-y
        [4.5, 2.15], [14.5, 2.15], [24.5, 2.15], [34.5, 2.15],
        [4.5, 10.6], [14.5, 10.6], [24.5, 10.6], [34.5, 10.6],
        [4.5, 18.9], [14.5, 18.9], [24.5, 18.9], [34.5, 18.9]
        ];

      let x, y, width, height;
      if (i < positions.length) {
        x = positions[i][0] * dpi;
        y = positions[i][1] * dpi;
        width = 4.25 * dpi;
        height = 3.75 * dpi;
      } else {
        x = i % 2 === 0 ? canvasWidth - (4.25 * dpi) : canvasWidth / 40;
        y = Math.floor((i - 1) / 2) * (3.75 * dpi) + canvasHeight / 28;
        width = 4.25 * dpi;
        height = 3.75 * dpi;
      }

      if (i < 12) {  
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);
        ctx.restore();
      } else {  
        ctx.drawImage(loadedPNG, x, y, width, height);  
      } 
    }
    // Use jsPDF to create a PDF from the canvas
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [canvasWidthInches, canvasHeightinches],
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or a lower value
    });

    // Add the canvas to the PDF
    pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
    pdf.save('WSKDCT KSL.pdf');  // Name of the PDF file
  }, 100);

  const url = 'path/to/your.pdf'; // Replace with the path to your PDF file

// Asynchronously download PDF
pdfjsLib.getDocument(url).promise.then(pdf => {
    // Fetch the first page
    pdf.getPage(1).then(page => {
        const scale = 1.5; // Adjust the scale as needed
        const viewport = page.getViewport({ scale });

        // Prepare canvas using PDF page dimensions
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF page into canvas context
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
}).catch(error => {
    console.error('Error loading PDF: ', error);
});
}



// SKTPAD

if (document.querySelector("#format-btn").innerText === "SKTPAD") {
  const files = document.getElementById('file-input').files;
  if (files.length > 15) {
    alert('Error: You can only select up to 15 images.');
    return;
  }
  generatePreview();
  setTimeout(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidthInches = 40;
    const canvasHeightinches = 28;
    const dpi = 300; // 300 DPI for print resolution  
    const canvasWidth = canvasWidthInches * dpi;
    const canvasHeight = canvasHeightinches * dpi;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    for (let i = 0; i < loadedPNGs.length; i++) {
      const loadedPNG = loadedPNGs[i];

      const positions = [ // x-y
        [1.182, 1.103], [8.9385, 1.103], [16.695, 1.103], [24.668, 1.103], [33.074, 1.103],
        [1.182, 10.106], [8.9385, 10.106], [16.695, 10.106], [24.668, 10.106], [33.074, 10.106],
        [1.182, 19.109], [8.9385, 19.109], [16.695, 19.109], [24.668, 19.109], [33.074, 19.109],

        ];

      let x, y, width, height;
      if (i < positions.length) {
        x = positions[i][0] * dpi;
        y = positions[i][1] * dpi;
        width = 5.53 * dpi;
        height = 7.84 * dpi;
      } else {
        x = i % 2 === 0 ? canvasWidth - (5.53 * dpi) : canvasWidth / 40;
        y = Math.floor((i - 1) / 2) * (7.84 * dpi) + canvasHeight / 28;
        width = 5.53 * dpi;
        height = 7.84 * dpi;
      }

      if (i < 15) {  
        ctx.save();  
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(Math.PI * 2); // Rotate by 360 degrees
        ctx.drawImage(loadedPNG, -width / 2, -height / 2, width, height);  
        ctx.restore();  
      } else {  
        ctx.drawImage(loadedPNG, x, y, width, height);  
      } 
    }
    // Use jsPDF to create a PDF from the canvas
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [canvasWidthInches, canvasHeightinches],
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or a lower value
    });

    // Add the canvas to the PDF
    pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvasWidthInches, canvasHeightinches);
    pdf.save('SKTPAD.pdf');  // Name of the PDF file
  }, 100);
}















































  // add more here

}

// Function to generate and display the preview of the final image
function generatePreview() {  
  const format = document.querySelector("#format-btn").innerText;  
  let previewImageUrl;  
  
  // Set the previewImageUrl based on the selected format  
  switch (format) {  
    case 'Desk Plates':  
      previewImageUrl = '/static/images/template/desktop_template.png';  
      break;  
    case 'Flutes':  
      previewImageUrl = '/static/images/template/flutes_template.png';  
      break;  
    case 'Stanly Tags':  
      previewImageUrl = '/static/images/template/stanly_tags_template.png';  
      break; 
    case 'Golfballs':  
      previewImageUrl = '/static/images/template/golfballs_template.png';  
      break; 
    case 'Bookmarks':  
      previewImageUrl = '/static/images/template/bookmarks_template.png';  
      break; 
    case 'Mugs':  
      previewImageUrl = '/static/images/template/mugs_template.png';  
      break;
    case 'Planks 6X6':  
      previewImageUrl = '/static/images/template/planks_6X6_template.png';  
      break;
    case 'Planks 8X8':  
      previewImageUrl = '/static/images/template/planks_8X8_template.png';  
      break;
    case 'Planks 10X10':  
      previewImageUrl = '/static/images/template/planks_10X10_template.png';  
      break;
    case 'Planks 12X12':  
      previewImageUrl = '/static/images/template/planks_12X12_template.png';  
      break;
    case 'Planks 18X6':  
      previewImageUrl = '/static/images/template/planks_18X6_template.png';  
      break;
    case 'Planks 24X12':  
      previewImageUrl = '/static/images/template/planks_24X12_template.png';  
      break;
    case 'Mats 36X24 Colored Mats':  
      previewImageUrl = '/static/images/template/mats_36x24.png';  
      break;
    case 'Mats 30x18 Colored Mats':  
      previewImageUrl = '/static/images/template/mats 30x18.png';  
      break;
    case 'Mats 24x16 Colored Mats':  
      previewImageUrl = '/static/images/template/mats 24x16.png';  
      break;
    case 'Mats 18x12 Colored Mats':  
      previewImageUrl = '/static/images/template/mats 18x12.png';  
      break;
    case 'Cutting board 1117':  
      previewImageUrl = '/static/images/template/CB 1117.png';
      break;
    case 'Cutting board 1117 groove': 
      previewImageUrl = '/static/images/template/CB 1117.png';  
      break;
    case 'Cutting board 0812':  
      previewImageUrl = '/static/images/template/CB 0812.png';  
      break;
    case 'Cutting board 0812 groove':  
      previewImageUrl = '/static/images/template/CB 0812.png';  
      break;
    case 'Cutting board 1108':  
      previewImageUrl = '/static/images/template/CB 1108.png';  
      break;
    case 'Cutting board 0806':  
      previewImageUrl = '/static/images/template/CB 0806.png'; 
      break;
    case 'Cutting board 1114 bamboo':  
      previewImageUrl = '/static/images/template/CB 1114.png';  
      break;
    case 'Cutting board PDCB': 
      previewImageUrl = '/static/images/template/CB PDCB.png';  
      break;
    case 'Cutting board PD thin 1206':  
      previewImageUrl = '/static/images/template/CB PD thin 1206.png';  
      break;
    case 'Cutting board PD thin 1507':  
      previewImageUrl = '/static/images/template/CB PD thin 1507.png'; 
      break;
    case 'CB BAMBOO HAN511':  
      previewImageUrl = '/static/images/CB BAMBOO HAN511.png';
      break;
    case 'Cutting board COC board':  
      previewImageUrl = '/static/images/template/CB COC.png';  
      break;
    case 'WSKDCT CAP':  
      previewImageUrl = '/static/images/WSKDCT CAP.png';  
      break;
    case 'WSKDCT KSL':  
      previewImageUrl = '/static/images/WSKDCT KSL.png';  
      break;
    case 'SKTPAD':  
      previewImageUrl = '/static/images/SKTPAD.png';  
      break;
    default:  
      previewImageUrl = '';  
  }  

  
  if (previewImageUrl) {  
    const previewImage = new Image();  
    previewImage.src = previewImageUrl;  
    previewImage.classList.add('preview-pdf');  
    previewArea.innerHTML = '';  
    previewArea.appendChild(previewImage);  
  } else {  
    // Clear the preview area if no specific image found for the format  
    previewArea.innerHTML = '';  
  }  
}  

// Function to convert data URL to Blob
function dataURLToBlob(dataURL) {
  const binaryString = atob(dataURL.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryString.length; i++) {
    view[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([arrayBuffer], { type: 'image/png' });

  return blob;
}  