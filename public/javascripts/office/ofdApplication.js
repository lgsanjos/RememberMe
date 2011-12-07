  // # ofdApplication.js
  // Descricao:
  //   Responsavel por funcoes de nivel de framework
  // Dependencia:
  //   JQuery, DroppedItem, Base, ofdSystem
  // -------------------

function initialization(){
  try{
    statusBar('Inicializando...');
   
    setContextMenu();
    ChangedItens = new Hash();
    startChangedMonitor();

  }catch(E){
    raiseException(E);
  }finally{
    statusBar('');
  }

}


// --------------

function saveChangedItensList(){
    if ( ChangedItens.length >= 1 ){
      try{
        statusBar('Salvando...');

        for (var item in ChangedItens.items) {
          var _pointer = ChangedItens.getItem(item);

          if (_pointer instanceof ofdCustomDroppedItem){

            if (_pointer.Save()){
              statusBar('Salvo com sucesso...');
              ChangedItens.removeItem(item);
            }
          }
        }
      }catch(E){
        raiseException(E);
      }finally{
        statusBar('');
      }
    }
}

function startChangedMonitor(){

   _int = window.setInterval(function(){saveChangedItensList();}, 10000);
}

// --------------

function statusBar(aText){
  try{
    // Singletone
    if (!$('#statusbar').length){
      cont = '<div id="statusbar" class="statusbar"></div>';
      $('#page').append(cont);
    }

    if (aText != '')
      $('#statusbar').html(aText).fadeIn('slow');
    else
      //Adicionado um delay só pra fazer graca
      _int = window.setInterval(function(){ $('#statusbar').fadeOut('slow'); clearInterval(_int); }, 1000);

  }catch(E){
    raiseException(E);
  }

}

// -------------------
// Define as funcionalidades para os elementos draggables e Resizables
function setDnR(){

  try{

    $('.DroppedItem').draggable({
           drag: function(event, ui){
               if ((ui.offset.top <= 100) && (ui.offset.left <= 600)){
                 $(self).offset.top(100);
               }

           },
           scroll : true
     }).resizable();
       
  }catch(E){
    raiseException(E);
  }


}
