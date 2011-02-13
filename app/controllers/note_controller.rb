class NoteController < ApplicationController

  before_filter :authenticate

  # POST /note
  def save

    @note = Note.find(:first, :conditions => { :UUID => params[:note][:UUID] })

    if @note.blank?
      @note = Note.new(params[:note])
    else
      @note.attributes=(params[:note])
    end


    @note.user_id = session[:usr].id;
    if @note.save
      render :inline => "OK"
    else
      render :inline => "failed"
    end
  end


  #Post /note
  def trash
    @note = Note.find(:first, :conditions => { :UUID => params[:note][:UUID] })

    unless @note.blank?
      @note.trashed = true
      @note.save
    end
  end

  #Get /note
  def view_trash
    @note = Note.find(:all, :conditions => { :trashed => true, :user_id => session[:usr].id}, :order => "notes.id DESC, notes.created_at DESC");
    # TODO: Refotarar: Retornar a tabela html é gambiarra.
    # Porem foi a forma mais otimizada encontrada no momento

    res = '
      <thead>
        <tr>
          <th width="50%">Anota&ccedil;&atilde;o</th>
          <th width="15%">Criado em</th>
          <th width="15%">Foi pro lixo</th>
          <th width="20%">A&ccedil;&otilde;es</th>
        </tr>
      </thead>
      <tbody>
    '
    if @note.blank?
      res += '<td colspan="4">N&atilde;o h&aacute; itens na lixeira.<td>'
    else
      @note.each_with_index do |item, index|
        res += "
          <tr id='tr_#{item.id}'>
            <td>#{item.conteudo[0..55]} #{' ...' if item.conteudo.length > 60}</td>
            <td>#{item.created_at.strftime('%d/%m/%Y')}</td>
            <td>#{item.updated_at.strftime('%d/%m/%Y')}</td>
            <td>
              <a href='#' onclick='recycleNote(\"#{item.id}\");'>Restaurar</a>
              <a href='#' onclick='removeNote(\"#{item.id}\");'>Remover</a>
            </td>
          </tr>
        "
      end            
    end

    res += '</tbody>'
    render :inline => res
  end


  #Post /note
  def remove
    @note = Note.find(:first, :conditions => { :id => params[:note][:id] })
    unless @note.blank?
      @note.delete
      render :inline => 'Ok'
    end    
  end

  #Post /note
  def recycle
    @note = Note.find(:first, :conditions => { :id => params[:note][:id] })

    unless @note.blank?
      @note.trashed = false
      @note.save
      #TODO: Refotarar, retornar o comando JS é gambiarra
      render :inline => "NewNote( #{@note.posX}, #{@note.posY}, \"#{@note.conteudo_tratado}\", #{@note.width}, #{@note.height}, false, true, \"#{@note.UUID}\" );"
    end
  end


end
