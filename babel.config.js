// Configuração da ferramenta Babel.

module.exports = { // Exporta o objeto de configuração para o Babel.
  presets: [ // Define um array de presets (conjuntos de plugins) a serem usados.
    [ // Inicia a configuração para um preset específico.
      '@babel/preset-env', // Usa o preset inteligente que transpila o JS moderno com base nos alvos.
      { // Objeto de opções para o '@babel/preset-env'.
        targets: '> 0.25%, not dead', // Define os navegadores alvo para a transpilação.
      },
    ],
  ],
};