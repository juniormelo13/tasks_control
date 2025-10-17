// Funções e variáveis responsáveis por importar e renderizar ícones (svg) da aplicação.

// Importações dos ícones (svg).
import anglesDownSvg from "../../assets/icons/angles-down.svg";
import anglesLeftSvg from "../../assets/icons/angles-left.svg";
import anglesRightSvg from "../../assets/icons/angles-right.svg";
import checkSvg from "../../assets/icons/check.svg";
import clockSvg from "../../assets/icons/clock.svg";
import fileLinesSvg from "../../assets/icons/file-lines.svg";
import moonSvg from "../../assets/icons/moon.svg";
import penSvg from "../../assets/icons/pen.svg";
import plusSvg from "../../assets/icons/plus.svg";
import rotateSvg from "../../assets/icons/rotate.svg";
import sunSvg from "../../assets/icons/sun.svg";
import thumbsUpSvg from "../../assets/icons/thumbs-up.svg";
import trashSvg from "../../assets/icons/trash.svg";
import wrenchSvg from "../../assets/icons/wrench.svg";
import xmarkSvg from "../../assets/icons/xmark.svg";

// Objeto com nome dos ícones, que recebem seus respectivos códigos HTML.
const icons = {
  "angles-down": anglesDownSvg,
  "angles-left": anglesLeftSvg,
  "angles-right": anglesRightSvg,
  "check": checkSvg,
  "clock": clockSvg,
  "file-lines": fileLinesSvg,
  "moon": moonSvg,
  "pen": penSvg,
  "plus": plusSvg,
  "rotate": rotateSvg,
  "sun": sunSvg,
  "thumbs-up": thumbsUpSvg,
  "trash": trashSvg,
  "wrench": wrenchSvg,
  "xmark": xmarkSvg,
};

// Função principal responsável por renderizar os ícones (svg) importados em tela.
export default function initRenderIcons() {

  const iconBoxes = document.querySelectorAll("[data-icon-name]"); // Variável que recebe todas as "caixas" que armazenam cada ícone.
  console.log(iconBoxes)
  console.log(anglesDownSvg)

  // Loop por todas as "caixas de ícone".
  iconBoxes.forEach((iconBoxe) => {
    const iconName = iconBoxe.dataset.iconName; // Variável que recebem os nomes do atributo dataset de cada "caixa".
    if (icons[iconName]) {
      const svgString = icons[iconName]; // Pega a string do SVG importada.
      const accessibleSvgString = svgString.replace('<svg', '<svg aria-hidden="true"'); // Adiciona o atributo de acessibilidade.
      iconBoxe.innerHTML = accessibleSvgString; // Se o svg existir, insira-o no html da sua "caixa" correspondente.
    }
  });

}
