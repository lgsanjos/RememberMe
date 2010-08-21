function initialization(){
  try{
    statusBar('Inicializando...');
   
    setContextMenu();
    ChangedItens = new Hash();
    startChangedMonitor(ChangedItens);

  }catch(E){
    alert(E);
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

          if (_pointer instanceof DroppedItem){

            if (_pointer.Save()){
              statusBar('Salvo com sucesso...');
              aChangedList.removeItem(item);
            }
          }          
        }
      }catch(E){
        alert(E);
      }finally{
        statusBar('');
      }
    }
    
  }
  

  _int = window.setInterval(function(){checkList();}, 10000);
}

// --------------

function setContextMenu(){
    try{
        var menu1 = [
        {'Novo lembrete': function(menuItem,menuObject) {
                                var pos = $(menuObject.menu).position();
                                NewNote(pos.left, pos.top);
                                }}
        ];

        $('#page').contextMenu(menu1,{theme:'vista'});

    }catch(E){
        alert(E);
    }
}