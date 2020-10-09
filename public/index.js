  const Mask = {
    apply(input, func ) {

      setTimeout( () => {
        input.value = Mask[func](input.value)
      },1)
    },

    formatBRL(value) {
      value = value.replace(/\D/g,"")

      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(value/100)

    }
  }

  const PhotosUpload = {
    preview: document.querySelector('#photos-preview'),
    uploadLimit:6,  

    handleFileInput(event) {
      const { files: fileList } = event.target;
      
      if(PhotosUpload.hasLimit(event)) return

      Array.from(fileList).forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          const image = new Image();
          image.src = String(reader.result);

          const container = PhotosUpload.getContainer(image)

          PhotosUpload.preview.appendChild(container);
        }

        reader.readAsDataURL(file);

      });
    },

    hasLimit(event){
      const { uploadLimit } = PhotosUpload;
      const { files: fileList } = event.target;

      if(fileList.length > uploadLimit) {
        alert("Send max 6 photos");
        event.preventDefault();
        return true
      }

      return false
    },

    getContainer(image) {
      const container = document.createElement('div');
      container.classList.add('photo');

      container.onclick = PhotosUpload.removePhoto

      container.appendChild(image);

      container.appendChild(PhotosUpload.getRemoveButton());

      return container
    },

    getRemoveButton() {
      const button = document.createElement('i');
      button.classList.add('material-icons');
      button.innerHTML = "close"
      return button
    },

    removePhoto(event) {
      const  photoDiv = event.target.parentNode;
      const photosArray = Array.from(PhotosUpload.preview.children);
      const index = photosArray.indexOf(photoDiv);

      photoDiv.remove();
    }
  }