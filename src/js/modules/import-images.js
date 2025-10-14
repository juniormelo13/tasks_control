// Funções e variáveis responsáveis por importar e renderizar imagens da aplicação.

// Importações das imagens.
import logoImgSrc from "../../assets/images/logo.png"
import defaultAvatarSrc from "../../assets/images/profile-avatar.png"

// Função principal responsável por renderizar as imagens importadas em tela.
export default function initSetImageSrc() {
  const logoImg = document.querySelector("#logoImg")
  const uploadedImg = document.querySelector("#uploadedImg")
  
  logoImg.src = logoImgSrc
  uploadedImg.src = defaultAvatarSrc
}