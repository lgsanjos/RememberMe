/* SetupRightMenu
 *   Adiciona as funcionalidades para os itens do menu direito (Right_Menu)
 *   tais como as de drag n drop e click
 */
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

      $('#page').contextMenu('divContextMenu', {

         bindings: {

             'novaNota' : function(e,target,pos){
                            //alert('left: ' pos.left + ' top: ' + pos.top);
                            NewNote(pos.left, pos.top);
             }

         }
      });


    }catch(E){
        raiseException(E);
    }
}