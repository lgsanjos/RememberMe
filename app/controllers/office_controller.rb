class OfficeController < ApplicationController
  before_filter :authenticate, :except => [:welcome]
    
  def index
      @note = Note.find(:all, :conditions => {'trashed' => false, 'user_id' => session[:usr].id} )     
      @apptitle = "#{session[:usr].login}@d - Office Desk"
  end

  def welcome
     @apptitle = "Office Desk";
  end

  def adm
    redirect_to :action => :index unless is_usuario_administrador
    @apptitle = "Office Desk - ADMIN::#{session[:usr].login}";

    @totalUsuarios = Usuario.count_by_sql "SELECT COUNT(id) FROM usuarios"
    @totalPostAtivos = Note.count_by_sql "SELECT COUNT(id) FROM notes WHERE trashed='0'"
    @totalPostInativos = Note.count_by_sql "SELECT COUNT(id) FROM notes WHERE trashed='1'"
    #@totalDesk = Desk.count_by_sql "SELECT COUNT(*) FROM desks"
    @mediaPostAtivoPorUsuarios = @totalPostAtivos / @totalUsuarios
    @mediaPostInativoPorUsuarios = @totalPostInativos / @totalUsuarios
    @mediaPostPorUsuarios = (@totalPostAtivos + @totalPostInativos) / @totalUsuarios
    

  end

end
