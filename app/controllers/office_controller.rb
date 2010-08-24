class OfficeController < ApplicationController

  def index
    # TODO: Filtrar pelo usuario da sessão

    @note = Note.find(:all, :conditions => {'trashed' => false} )   
  end

  def welcome
    
  end

end
