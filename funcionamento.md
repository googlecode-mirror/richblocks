# Funcionamento #
O Framework é como um plug-in de uma Interface para um sistema web. A figura 1        ilustra o que isso quer dizer.

**Figura 1**
![http://jaydson.springerit.com/img/plugin.jpg](http://jaydson.springerit.com/img/plugin.jpg)

O Framework baseia-se na idéia de menus, funções e janelas. Um elemento menu  pode possuir vários elementos sub-menus e cada elemento sub-menu, além de poder possuir vários outros elementos sub-menus, faz uma chamada que é responsável por abrir uma janela ou por executar alguma função Javascript já nativa no Framework, ou escrita pelo desenvolvedor, isto quer dizer que quem estiver implantando a interface poderá usar funções já existentes no Framework e também poderá customizar a interface de acordo com a necessidade do sistema em que a interface estiver sendo implantada.
Os elementos janela possuem uma série de atributos ,estes definem todas as funcionalidades da janela, como título, posição na tela, dimensões, pagina que será carregada no seu corpo e ainda algumas opções booleanas, como maximizar, minimizar, fechar e atualizar que permitem que seja possível criar uma janela definindo quais propriedades ela no terá quando exibida.
Funções são definidas da maneira tradicional de definições de funções Javascript, porém estas ficam armazenadas em um arquivo XML, e só é executada quando chamada por alguma opção de menu.
O Framework possui uma estrutura que é composta por uma série de arquivos XML que são a base de configuração de como o sistema deve funcionar, e bibliotecas Javascript que são o núcleo do Framework, ou seja, são estas bibliotecas que provem toda a funcionalidade RIA para o sistema. A figura 2 ilustra o funcionamento do Framework.

**Figura 2**
![http://jaydson.springerit.com/img/funcionamento.jpg](http://jaydson.springerit.com/img/funcionamento.jpg)

Para definir menus, sub-menus, janelas, funções e chamadas se faz necessário o conhecimento em Javascript e XML, pois todas as configurações ficam armazenadas em arquivos XML e todas as funções nativas foram feitas em Javascript, então logicamente alguma função que seja criada deverá ser implementada em Javascript.
Primeiramente, o desenvolvedor terá que mapear o sistema em que a interface será implantada, isto é, determinar quais as opções de menu serão exibidas, quais janelas o sistema vai ter, e quais funções este sistema irá executar. 	Depois de mapeado, os arquivos XML devem ser populados para determinar quais menus serão necessários, quais janelas estes menus irão abrir, ou quais funções o menu irá executar, e também definir as janelas e seus atributos e as funções Javascript que poderão ser executadas.
Existem duas abordagens de como o Framework poderá ser usado:
**Projeto inicial:**
Nesta abordagem inicia-se o desenvolvimento de um sistema usando a estrutura
do Framework como base para criação da interface gráfica. Nesta fase, é necessário adequar a estrutura do Framework ao processo de desenvolvimento adotado pela equipe responsável.
**Projeto existente:**
Nesta, existe um sistema web que não utiliza metodologia RIA, ou seja, funciona da maneira tradicional de navegação em um browser, então o Framework se encarregará de adequar este sistema a uma nova interface.