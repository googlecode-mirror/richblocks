Especificação da Aplicação:

A aplicação deve abrir uma janela com o texto "Hello World".


Desenvolvimento:

Passo 1 : Mapear menus e janelas.

Passo 2 : Editar o arquivo menu.xml para suportar a aplicação

Passo 3 : Editar o arquivo windows.xml para suportar a aplicação

Passo 4: Criar uma página que terá o texto e será exibida dentro da janela.



Código:


Alterando o arquivo menu.xml

```
<?xml version="1.0" encoding="ISO-8859-1" ?>
<MenuInterfaceRia>
       <menu name="menu_0" value="Menu">
             <option name="option1_menu_0" value="Hello World" windowTarget="hello" img="img.gif" shortcut="Alt+G"></option>
       </menu>
</MenuInterfaceRia>
```


Depois de mapeado quais menus o sistema irá ter, temos que alterar o arquivo xml.

Note no código acima é dado um nome para o menu, definido no atributo "name" e um valor, que é definido pelo atributo "value".

"name" é obrigatório pois é a referência que o Javascript usa para montar o menu, e "value" é o valor que aparecerá no menu.

Alterando o arquivo windows.xml
```
<?xml version="1.0" encoding="ISO-8859-1" ?>
<WindowInterfaceRia>
       <window name="hello"
               title="Hello World"
               description="Janela Hello World"
               defaultTop="100"
               defaultLeft="300"
               defaultWidth="300"
               defaultHeight="400"
               minWidth="120"
               minHeight="120"
               pageSrc="hello.html"
               ajax="true"
               newInstance="false"
               forceZindex="true"
               minimize="true"
               maximize="true"
               close="true"
               drag="true"
               resize="true"
               posAbsolute="none"
               defaultFooter="Hello World">
       </window>
</WindowInterfaceRia>        

```

Novamente, depois de mapeado as janelas que o sistema irá possuir, deve ser configurado o arquivo XML.

No código acima é definida uma janela com o nome "hello" e o conteúdo desta janela será a página "hello.html".

As páginas que serão carregadas dentro das janelas devem estar no diretório /src\_application.



Alterando o arquivo right\_button\_menu.xml

```
<?xml version="1.0" encoding="ISO-8859-1" ?>
<rightButtonMenu>
      <menu name="menu_1" frameReference="frame_menu">
            <option name="option1_menu1" value="Hello World " windowTarget="hello" img="img.png"></option>
      </menu>
</rightButtonMenu>

```

Menu de botão direito também são definidos em XML.

A sintaxe é a mesma de um menu, com exceção do atributo "frameReference", que o alvo onde o botão direito é clicado.

No código acima o "frameReference" tem o valor de frame\_menu, que o frame onde ficam os menus.

Outro valor possível é frama\_properties, que é corpo da aplicação.


Arquivo hello.html

```
<html>
       <head>
       </head>
<body>
       Hello World
</body>
</html>
```

Um arquivo HTML foi criado e será carregado dentro da janela.

Qualquer arquivo pode ser incluido dentro de uma janela, arquivos .PHP, .JSP, .ASP, etc.

Ainda pode ser carregado dentro da janela objetos Flash e Applets Java, resumindo, qualquer página HTML.