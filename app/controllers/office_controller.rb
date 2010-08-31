class OfficeController < ApplicationController
  before_filter :authenticate, :only => [:index] 
    
  def index
    @note = Note.find(:all, :conditions => {'trashed' => false, 'user_id' => session[:id]} )
    if @note.blank?
      @note = Note.new()
      @note.trashed = false
      @note.conteudo = 'Bem vindo ao OfficeDesk, clique com o botão direito para acessar o menu.'
      @note.posX = '200'
      @note.posY = '170'
      @note.width = '150'
      @note.height = '160'
      @note.save
      @note = Note.find(:all, :conditions => {'trashed' => false, 'user_id' => session[:id]} )
    end
  end

  def welcome
    
  end

end
