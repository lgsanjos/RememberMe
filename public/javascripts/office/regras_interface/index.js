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

// -------------

function removeNote(id) {

    $.ajax({
             type: 'POST',
             async: true,
             data: ({
                'note':{
                         'id': id
                       }
                     }),

             url: '/notes/remove',

             success: function(data){
                        if (data === 'Ok'){
                           $('#tr_' + id).fadeOut("fast",function(){
                             $('#trashListTable').dataTable().fnDestroy();
                             $(this).remove();
                             drawTrashListTable();
                           });


                        }
             },

             error: function(XMLHttpRequest, textStatus, errorThrow){
                   raiseException('Oops, an error occurred while we were removing your note: ' + errorThrow);
             }

    });
  }

//-------------

  function recycleNote(id){
    $.ajax({
             type: 'POST',
             async: true,
             data: ({
                'note':{
                         'id': id
                       }
                     }),

             url: '/notes/reclyce',

             success: function(data){

                        $('#tr_' + id).fadeOut("fast",function(){
                           var func = '';
                           func = 'try{';
                           func += data;
                           func += '}catch(e){';
                           func += '  raiseException(e);';
                           func += '}';
                           eval(func);

                           $('#trashListTable').dataTable().fnDestroy();
                           $(this).remove();
                           drawTrashListTable();

                        });

             },

             error: function(XMLHttpRequest, textStatus, errorThrow){
                   raiseException('Just happened an error while we were recycling your note: ' + errorThrow);
             }

    });
  }
  
//-------------  

  function drawTrashListTable(){
       $('#trashListTable').dataTable({
           "bPaginate": true,
           "sPaginationType": "full_numbers",
           "bLengthChange": false,
           "bFilter": false,
           "bSort": true,
           "bInfo": false,
           "bAutoWidth": false,
           "iDisplayLength": 15,
           "oLanguage": {
                   "sLengthMenu": "Display _MENU_ records per page",
                   "sZeroRecords": "Trash is empty",
                   "sInfo": "Showing _START_ to _END_ of _TOTAL_notes",
                   "sInfoEmpty": "showing 0 to 0 of 0 notes",
                   "sInfoFiltered": "(filtered from _MAX_ total records)"
           }
       });
  }

// -------------
  
  function preparaSignOut() {
	     $("#signOut").click(function() {
	        saveChangedItensList();
	     });
  }
  
//-------------  
  
  function preparaPiroboxTrash() {

     function onShow() {
         $.ajax({
                  type: 'GET',
                  url: 'note/view_trash',
                  async: true,
                  success: function(data){

                    $('#trashListTable').html(data);
                    drawTrashListTable();

                  },
                  error: function(XMLHttpRequest, textStatus, errorThrow){
                        raiseException('Sorry, but occurred an error while opening the trash: ' + errorThrow);

                  }
                });
	 }

	 try{
	   setPirobox(htmlContentTrash, onShow);
	 }catch(e){
	   raiseException(e);
	 }
}
  
//-------------  
  
  function preparaPiroboxNewDesk() {

     function onShow() {
       $('#desk_nome').focus();
	 }

	 try{
	   setPirobox(htmlContentNewDesk, onShow);
	 }catch(e){
	   raiseException(e);
	 }
}  