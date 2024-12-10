document.addEventListener('DOMContentLoaded', function () {
  const imageInput = document.getElementById('image-upload');
  const imageContainer = document.getElementById('image-container');
  const postImage = document.getElementById('post-image');
  const removeImageButton = document.getElementById('remove-image');

  // Quando o usuário seleciona uma imagem
  imageInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imageContainer.style.display = 'block'; // Mostra o contêiner
        postImage.src = e.target.result; // Define a imagem
      };
      reader.readAsDataURL(file); // Lê o arquivo
    } else {
      resetImage(); // Reseta caso nenhum arquivo seja selecionado
    }
  });

  // Botão para remover a imagem anexada
  removeImageButton.addEventListener('click', function () {
    resetImage();
  });

  // Função para resetar o estado do contêiner de imagem
  function resetImage() {
    imageContainer.style.display = 'none'; // Oculta o contêiner
    postImage.src = ''; // Remove o conteúdo da imagem
    imageInput.value = ''; // Limpa o input de arquivo
  }
});
