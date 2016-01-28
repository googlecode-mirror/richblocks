# Configurando os arquivos XML #

Menus e Janelas são definidos em arquivos XML.
Para integrar a interface ao seu sistema, faça um mapeamento de quais opções de menu ele vai ter, e quais janelas essas opções irão abrir.

## Menus: ##

O sistema possui menus que ficam no topo, e menus de botão direito.
Estes arquivos ficam no diretório /conf.
São eles: _menu.xml_ e _right\_button\_menu.xml_.
Abaixo na tabela 1 segue a lista de atributos que um menu pode possuir.

**Tabela 1**


Abaixo um exemplo de configuração de menu que fica no topo:
```
<menu name="menu_0" value="Arquivo" img="img.png" shortcut="Ctrl+C">
      <option name="option1_menu0" 
              value="Novo Projeto" 
              windowTarget="arquivo" 
              img="img.png" 
              shortcut="Alt+A" 
              hasChild="true"> 
      </option>
      <option name="option2_menu0" 
              value="Abrir" 
              windowTarget="abrir" 
              img="img.png" 
              shortcut="Ctrl+N">
      </option>
      <option name="option3_menu0" 
              value="Salvar" 
              windowTarget="salvar" 
              img="img.png" 
              shortcut="Ctrl+N">
      </option>
      <option name="option4_menu0" 
              value="Sair" 
              windowTarget="sair" 
              img="img.png" 
              shortcut="Ctrl+N">
      </option>
</menu>

```
A Figura 1 abaixo ilustra o menu gerado pelo Javascript.

**Figura 1**
![http://jaydson.springerit.com/img/menu.jpg](http://jaydson.springerit.com/img/menu.jpg)



## Janelas: ##
Todas as Janelas do Sistema são definidas no arquivo _windows.xml_, que está nodiretório /conf.
Abaixo na tabela 2 segue a lista de atributos que uma janela pode possuir.
**Tabela 2**
| **ATRIBUTOS** | **DESCRIÇÃO** |
|:--------------|:--------------|
| name          | Especifica o nome da janela, este é necessário para criar uma referência no sistema para poder ser chamado por algum menu ou função.|
| title         | Especifica o titulo da janela, será mostrado na parte superior da janela.|
| description   | Especifica uma descrição para a janela, necessário apenas para fins de documentação |
| defaultTop    | Especifica a posição top da janela ta tela. |
| defaultLeft   | Especifica a posição left da janela ta tela. |
| defaultWidth  | Especifica a largura da janela. |
| defaultHeight | Especifica a altura da janela. |
| minWidth      | Especifica a largura minima da janela. |
| minHeight     | Especifica a altura minima da janela. |
| pageSrc       | Especifica qual URL deve ser carregada no corpo da janela. |
| ajax          | Espicifica se o conteúdo deve ser carregado via ajax, se for false, será carregado em um Iframe |
| newInstance   | Especifica se a janela pode ser aberta mais de uma vez |
| minimize      | Especifica se a janela pode ser minimizada |
| maximize      | Especifica se a janela pode ser maximizada|
| close         | Especifica se a janela pode ser fechada |
| drag          | Especifica se a janela pode ser arrastada |
| resize        | Especifica se a janela pode ser redimensionada |

Abaixo um exemplo de código de uma janela:
```
<window name="new_client" 
        title="teste" 
        description="Janela Teste 1" 
        defaultTop="150" 
        defaultLeft="150" 
        defaultWidth="500" 
        defaultHeight="400" 
        minWidth="120" 
        minHeight="120" 
        pageSrc="janela1.php" 
        ajax="true" 
        newInstance="true" 
        minimize="true"
        maximize="true" 
        close="true" 
        drag="true" 
        resize="true" 
        defaultFooter="Rodape da Janela new_client" /> 

```

A Figura 2 abaixo ilustra uma janela gerada pelo Javascript.

**Figura 2**
![http://jaydson.springerit.com/img/window.jpg](http://jaydson.springerit.com/img/window.jpg)