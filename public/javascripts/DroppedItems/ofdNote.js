  // # note.js
  // Descricao:
  //   Objeto responsável pelo componente Note
  // Dependencia:
  //   JQuery, DroppedItem, Base, ofdSystem
  // -------------------

var Note = ofdCustomDroppedItem.extend({

    // constructor
    init: function(){

        this._super();

        // Properties
        this.posX = Math.floor(Math.random()* 650);
        this.posY = Math.floor((Math.random()* 300) + 100);
        this.width = 210;
        this.height = 200;
        // TODO: fazer mensagens aleatórias
        this.content = 'I must ...';
        this.shared = false;
        this.visible = true;
        this.date = '';
    },



    // Public
    Save: function(){
        //Check Params
        this.posX    = parseFloat($('#' + this.UUID).css('left'));
        this.posY    = parseFloat($('#' + this.UUID).css('top'));
        this.width   = parseFloat($('#' + this.UUID).css('width'));
        this.height  = parseFloat($('#' + this.UUID).css('height'));
        this.content = $('#' + this.UUID + '> .noteBody > .textArea').val();
        this.date = $('#' + this.UUID + '> .noteHeader > p').text();
        var returned = '';
        
        //Send Ajax
        $.ajax({
               type: 'POST',
               url: '/notes/save',
               async: false,
               data: ({
                 'note':{
                          'UUID': this.UUID,
                          'posX' : this.posX,
                          'posY' : this.posY,
                          'width' : this.width,
                          'height' : this.height,
                          'conteudo' : this.content,
                          'state' : '1',
                          'titulo' : ''
                         }
               }),
               success: function(data){
                    returned = data;
               },

               error: function(XMLHttpRequest, textStatus, errorThrow){
                    returned = 'OMG! An error happened when we were saving your note: ' + errorThrow;
                    
               }

              });

        // Aguarda a resposta do ajax
        while (returned == ''){
           sleep(100);
        }

        switch (returned){
           case 'OK': return true;
                      break;
                      
           case 'failed': return false;
                           break;

           default :
                 return false;

        }
        

    },

    Remove: function(){
        //Send Ajax
        $.ajax({
               type: 'POST',
               url: '/note/trash',
               async: false,
               data: ({
                 'note':{
                          'UUID': this.UUID
                        }
               }),
               success: function(data){
                    returned = data;
               },

               error: function(XMLHttpRequest, textStatus, errorThrow){
                    returned = 'Occurred and error while removing this note: ' + errorThrow;

               }

              });

          $('#' + this.UUID).fadeOut('fast');

    },

    Append: function(container){

        try{

            // Checa params
            if (container === undefined){
              container = $('#page');
            }


            if (this.UUID == ''){
              this.UUID = getUUID();
            }

             var nota = '';
             nota += '<div class="note DroppedItem" id="">';
             nota +=   '<div class="noteHeader draggable">';
             nota +=     '<p>' + this.date + '</p>';
             nota +=     '<a class="noteFechar">X</a>';
             nota +=   '</div>';
             nota +=   '<div class="noteBody">';
             nota +=     '<textarea class="textArea"></textarea>';
             nota +=   '</div>';
             nota += '</div>';


             $(container).append(nota);
             var $note = $('.note:last');
             $note.hide();
             $note.attr("id",this.UUID);
             $note.css("left",this.posX);
             $note.css("top",this.posY);
             $note.css("width",this.width);
             $note.css("height",this.height);
             // $('.noteBody:last > .TextArea').val(this.content);
             $('#' + this.UUID + '> .noteBody > .textArea').val(this.content.replace('<br />', "\n"));
             // Aguarda um tempo aleatorio para dar efeito


             setTimeout(function(){
               $note.fadeIn('slow');
             }, Math.floor((Math.random()* 900)));
             

             // Define eventos que serão interpretados futuramente,
             // logo todos os dados dentro dos eventos devem ser variados e analisados
             // no momento que irá ocorrer, e não neste momento de criaćão.

             var _self = this.SELF;

             function DoOnChange(Sender){
                if (ChangedItens.hasItem(Sender.UUID) === false){
                  ChangedItens.setItem(Sender.UUID, Sender);
                }

             }

             // Define todas as responsabilidades das alteracoes
             $('.noteBody:last > .textArea').keypress(function () {
                DoOnChange(_self);
             });


             $('.note:last').bind("dragstop", function () {
                DoOnChange(_self);
             });


             $('.note:last > .noteHeader > .noteFechar').click(function () {
                _self.Remove();
             });
             
        }catch(E){
          raiseException(E);
        }finally{
         //Finaliza adicionando comportamento
         setDnR();
        } 
    }

  });

function NewNote(posX,posY, aContent, aWidth, aHeight, shared, visible, aUUID, aDate){
   try{

      var _note = new Note();

      if (aUUID !== undefined) _note.UUID = aUUID;
      if (aContent !== undefined) _note.content = aContent;
      if (posX !== undefined) _note.posX = posX;
      if (posY !== undefined) _note.posY = posY;
      if (aWidth !== undefined) _note.width = aWidth;
      if (aHeight !== undefined) _note.height = aHeight;
      if (shared !== undefined) _note.shared = shared;
      if (aDate !== undefined) _note.date = aDate;

      _note.Append($('#page'));
    }catch(E){
      raiseException(E);
    }


}