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

