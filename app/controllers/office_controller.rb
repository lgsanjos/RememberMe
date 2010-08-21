class OfficeController < ApplicationController

  def index
    # TODO: Filtrar pelo usuario da sessão

    @note = Note.find(:all)

    
  end

end
