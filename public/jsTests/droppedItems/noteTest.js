module("NoteTest");

test("Instanciando",function(){ 

  var testNote = new Note();
  ok(testNote != "undefined", "Não Instanciou corretamente");
  ok(testNote instanceof Note, "Não instanciou do Objeto Note");
  ok(testNote instanceof DroppedItem, "Não herda de DroppedItem!");
  
});

test("Checar propriedades publicas", function(){
   var testNote = new Note();

   ok(testNote.UUID !== undefined, "UUID não está no escopo");
   ok(testNote.posX !== undefined, "posX não está no escopo");
   ok(testNote.posY !== undefined, "posY não está no escopo");
   ok(testNote.width !== undefined, "width não está no escopo");
   ok(testNote.height !== undefined, "height não está no escopo");
   ok(testNote.content !== undefined, "content não está no escopo");
   ok(testNote.shared !== undefined, "shared não está no escopo");
   ok(testNote.visible !== undefined, "visible não está no escopo");

});


// testes de criacao e append do NOTE

function CriarNote(aUUID){
  var testNote = new Note();
  var _UUID = ( aUUID != undefined) ? aUUID : getUUID();

  // cria Note
  testNote.UUID = _UUID;
  testNote.content = "conteudo apenas de teste!";
  testNote.posX = 200;
  testNote.posY = 100;
  testNote.visible = true;
  testNote.Append($("#qunit-tests"));

  return testNote;
}


test("Testar Append",function(){
  var testNote = new Note();
  var _UUID = getUUID();

  // cria Note
  testNote.UUID = _UUID;
  testNote.content = "conteudo apenas de teste!";
  testNote.posX = 200;
  testNote.posY = 100;
  testNote.visible = true;
  try{
    testNote.Append($("#qunit-tests"));

    // Checando se foi criado
    ok($("#" + _UUID) != undefined, "Objeto nao foi selecionado!");
    equals($('#' + _UUID + ' > .noteBody > .textArea').val(), "conteudo apenas de teste!", "Conteudo criado difere do conteudo informado");
    equals(parseFloat($("#" + _UUID).css("left")), testNote.posX, "A posicao de esquerda difere de posX");
    equals(parseFloat($("#" + _UUID).css("top")), testNote.posY, "A posicao de esquerda difere de posY");
    equals(parseFloat($("#" + _UUID).css("height")), testNote.height, "A altura difere de height");
    equals(parseFloat($("#" + _UUID).css("width")), testNote.width, "A largura difere de width");
  }
  finally{
    // Remove da tela
    $("#" + _UUID).remove();
  }
});


test("testar hash",function(){
  var has = new Hash();
  has.clear();
  has.setItem('teste', 'teste');

  for (item in has.items){
    equals(item === 'teste');
  }

})