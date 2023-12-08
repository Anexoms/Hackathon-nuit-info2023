document.addEventListener('DOMContentLoaded', function () {
  const imageInput = document.getElementById('imageInput');
  const targetSizeInput = document.getElementById('targetSize');
  const compressButton = document.getElementById('compressButton');
  const originalImage = document.getElementById('originalImage');
  const downloadLink = document.getElementById('downloadLink');

  compressButton.addEventListener('click', compressImage);

  function compressImage() {
    const file = imageInput.files[0];
    const targetSizeKB = parseInt(targetSizeInput.value, 10) * 1024;

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageUrl = e.target.result;

        // Display the original image
        originalImage.src = imageUrl;

        // Compress the image
        compressImageBlob(imageUrl, targetSizeKB)
          .then((compressedBlob) => {
            // Create a download link
            const compressedImageUrl = URL.createObjectURL(compressedBlob);
            downloadLink.href = compressedImageUrl;
            downloadLink.download = 'compressed_image.webp'; // Specify the filename

            // Trigger a click on the download link
            downloadLink.click();

            // Clean up the URL.createObjectURL
            URL.revokeObjectURL(compressedImageUrl);
          });
      };

      reader.readAsDataURL(file);
    }
  }

  function compressImageBlob(imageUrl, targetSizeKB) {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const width = img.width;
        const height = img.height;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        let quality = 1;
        let iterations = 0;
        const maxIterations = 10;

        function compress() {
          canvas.toBlob(
            function (blob) {
              if (blob.size <= targetSizeKB || iterations >= maxIterations) {
                resolve(blob);
              } else {
                quality -= 0.1;
                iterations++;
                compress();
              }
            },
            'image/webp',
            quality
          );
        }

        compress();
      };

      img.src = imageUrl;
    });
  }
});