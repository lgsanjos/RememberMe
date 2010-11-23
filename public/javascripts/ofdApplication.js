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
    startChangedMonitor(ChangedItens);

  }catch(E){
    raiseException(E);
  }finally{
    statusBar('');
  }

}


// --------------

function startChangedMonitor(aChangedList){

  function checkList(){
    if ( aChangedList.length >= 1 ){
      try{
        statusBar('Salvando...');

	for (item in aChangedList.items) {       
          var _pointer = aChangedList.getItem(item);

          if (_pointer instanceof ofdCustomDroppedItem){

            if (_pointer.Save()){
              statusBar('Salvo com sucesso...');
              aChangedList.removeItem(item);
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
  

  _int = window.setInterval(function(){checkList();}, 10000);
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
               if ((ui.offset.top <= 80) && (ui.offset.left <= 600)){
                 $(self).offset.top(80);
               }

           },
           scroll : true
     }).resizable();
       
  }catch(E){
    raiseException(E);
  }


}
