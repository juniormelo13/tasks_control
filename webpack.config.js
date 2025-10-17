// Importações de pacotes Node.js e plugins do Webpack.
const path = require('path'); // Módulo nativo do Node.js para lidar com caminhos de arquivos.
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Plugin para extrair CSS para arquivos separados.
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Plugin para minificar (comprimir) arquivos CSS.
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin para gerar um arquivo HTML com os scripts e estilos injetados.

// A configuração é exportada como uma função para podermos usar os argumentos 'argv'.
module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production'; // Variável booleana que verifica se estamos em modo de produção.

  return { // Retorna o objeto de configuração principal do Webpack.
    mode: isProduction ? 'production' : 'development', // Define o modo (produção ou desenvolvimento), ativando otimizações padrão.
    devtool: isProduction ? 'source-map' : 'eval-source-map', // Define o tipo de source map para depuração (alta qualidade para produção, rápido para desenvolvimento).
    entry: './src/js/script.js', // Define o ponto de entrada da aplicação, onde o Webpack começa a construir o gráfico de dependências.

    output: { // Define como e onde os arquivos de saída (bundles) serão salvos.
      path: path.resolve(__dirname, 'dist'), // Define a pasta de saída para os arquivos gerados (a pasta 'dist').
      filename: 'js/bundle.[contenthash].js', // Define o nome e o local do arquivo JavaScript final, com um hash para invalidação de cache.
      clean: true, // Limpa a pasta 'dist' antes de cada build para remover arquivos antigos.
    },

    module: { // Define como diferentes tipos de módulos (arquivos) serão tratados.
      rules: [ // Um array de regras, onde cada regra se aplica a um tipo de arquivo.
        {
          test: /\.js$/, // Aplica esta regra a todos os arquivos que terminam com .js.
          exclude: /node_modules/, // Ignora a pasta node_modules para acelerar o build.
          use: { // Usa o loader especificado para processar os arquivos.
            loader: 'babel-loader', // Passa o código JavaScript para o Babel transpilar.
          },
        },
        {
          test: /\.css$/i, // Aplica esta regra a todos os arquivos que terminam com .css.
          use: [ // Os loaders são aplicados da direita para a esquerda (de baixo para cima).
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // Em produção, extrai o CSS para um arquivo. Em desenvolvimento, injeta no HTML.
            'css-loader', // Lê o arquivo CSS e resolve as importações (@import, url()).
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i, // Aplica esta regra a vários tipos de arquivos de imagem.
          type: 'asset/resource', // Trata os arquivos como assets, copiando-os para a pasta de saída.
          generator: {
            filename: 'assets/images/[name].[hash][ext]' // Caminho de saída específico para imagens.
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i, // Aplica esta regra a vários tipos de arquivos de fontes.
          type: 'asset/resource', // Trata os arquivos como assets, copiando-os para a pasta de saída.
          generator: {
            filename: 'assets/fonts/[name][ext]' // Caminho de saída específico para fontes.
          }
        },
      ],
    },

    plugins: [ // Um array de plugins que adicionam funcionalidades extras ao processo de build.
      new MiniCssExtractPlugin({ // Instancia o plugin para extrair CSS.
        filename: 'css/bundle.[contenthash].css', // Define o nome do arquivo CSS final, com hash.
      }),
      new HtmlWebpackPlugin({ // Instancia o plugin para gerar o HTML.
        template: './src/index.html', // Usa este arquivo como molde.
        filename: 'index.html', // Define o nome do arquivo HTML final.
        favicon: './src/assets/images/favicon.png' // Adiciona o favicon ao HTML final.
      }),
    ],

    devServer: { // Configurações para o servidor de desenvolvimento do Webpack.
      static: { // Define o diretório de onde os arquivos estáticos serão servidos.
        directory: path.resolve(__dirname, 'dist'),
      },
      port: 3000, // Define a porta em que o servidor irá rodar (http://localhost:3000).
      open: true, // Abre o navegador automaticamente ao iniciar o servidor.
      hot: true, // Habilita o Hot Module Replacement (HMR) para atualizações ao vivo sem recarregar a página.
      compress: true, // Habilita a compressão gzip.
      historyApiFallback: true, // Redireciona todas as requisições 404 para o index.html, útil para SPAs.
    },

    optimization: { // Configurações de otimização para o build de produção.
      minimizer: [ // Um array de plugins para minificar (comprimir) o código.
        `...`, // Sintaxe especial para incluir os minificadores padrão do Webpack (para JavaScript).
        new CssMinimizerPlugin(), // Adiciona o plugin para minificar o CSS.
      ],
      minimize: isProduction, // Ativa a minificação apenas quando 'isProduction' for verdadeiro.
    },
  }
};