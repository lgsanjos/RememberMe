function SetupRightMenu(){

   function noteClick(){
     NewNote();
   }
   $('#note').click(noteClick);

   $('#note').draggable({
                          distance: 50,

                          start: function(e){
                             $(this).unbind('click');
                          },

                          stop: function(event, ui) {
                            try{
                              _posY = parseFloat($('#note').position().top + $('#right_menu').position().top);
                              _posX = parseFloat($('#note').position().left + window.innerWidth);
                              NewNote(_posX,_posY);

                              $('#note').css('top', 0);
                              $('#note').css('left', 0);

                            }catch(E){
                              raiseException(E);
                            }finally{
                              setTimeout( function(){
                                $('#note').click(noteClick);
                              }, 300);
                            }
                          }
                       });


 }

// ---------------

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
        raiseException(E);
    }
}