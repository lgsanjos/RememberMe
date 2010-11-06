var ofdCustomDroppedItem = Class.extend({

    // constructor
    init : function(){
        this.SELF = this;
        this.UUID = '';
    },

    //Public methods

    // MUST return boolean
    Save : function(){
        
    },

    Delete: function(){

    },

    Append: function(container){
        
    }    


});



////function DroppedItem(){
//  this.id = "";
//  this.pItem = nil;
//  this.hasChanged = false;
//  this.isFocused = false;
//
//}
//
//DroppedItemList = new Hash();
//
//function getDroppedItemList(){
//  return DroppedItemList;
//}
//
//function findDroppedItem(id){
//  if (id === ""){
//    throw "O campo id do objeto não pode ser nula.";
//  }
//
//  if (getDroppedItemList.hasItem(id)){
//    return getDroppedItemList.getItem(id);
//  }else{
//    return nil;
//  }
//
//
//}
//
//function saveDroppedItem(id, pItem){
//  // CheckParams
//  try{
//    var _dpi;
//    _dpi = findDroppedItem(id);
//
//    if (_dpi !== nil){
//        _dpi.hasChanged = true;
//    }else{
//        _dpi = new DroppedItem();
//        _dpi.id = id;
//        _dpi.pItem = pItem;
//        _dpi.hasChanged = true;
//        _dpi.isFocused = true;
//        DropedItemList.push(_dpi);
//        alert("Item adicionado!");
//    }
//  }catch(E){
//    alert(E);
//  }
//
//}