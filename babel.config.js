// Configuração da ferramenta Babel.

module.exports = {
  presets: [
    [
      '@babel/preset-env', // Preset inteligente que informa as regras de transpilação.
      {
        targets: '> 0.25%, not dead', // Traduza o código para que ele seja compatível com navegadores que tenham mais de 0.25% de participação no mercado global e que não estejam 'mortos'.
      },
    ],
  ],
};