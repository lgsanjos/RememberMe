class OfficeController < ApplicationController
  
  before_filter :authenticate, :except => [:welcome]
  
  def index

      self.seleciona_desks

      @notes = Note.find(:all, :conditions => {'trashed' => false, 'desk_id' => session[:desk].id} )
      @apptitle = "#{session[:usr].login}@#{session[:desk].nome} - Office Desk"
  end

  def welcome
     @apptitle = "Office Desk";
  end

  def adm
    redirect_to :action => :index unless is_usuario_administrador
    @apptitle = "Office Desk - ADMIN::#{session[:usr].login}"

    @totalUsuarios = Usuario.count_by_sql "SELECT COUNT(id) FROM usuarios"
    @totalPostAtivos = Note.count_by_sql "SELECT COUNT(id) FROM notes WHERE trashed='0'"
    @totalPostInativos = Note.count_by_sql "SELECT COUNT(id) FROM notes WHERE trashed='1'"
    #@totalDesk = Desk.count_by_sql "SELECT COUNT(*) FROM desks"
    @mediaPostAtivoPorUsuarios = @totalPostAtivos / @totalUsuarios
    @mediaPostInativoPorUsuarios = @totalPostInativos / @totalUsuarios
    @mediaPostPorUsuarios = (@totalPostAtivos + @totalPostInativos) / @totalUsuarios
  end

  def seleciona_desks 
    @desks = Desk.find(:all, :conditions => {'desks.usuario_id' => session[:usr].id}, :order => :ordem)

    # TODO: checar se ha desk para o usuario
    if @desks.nil?
    end

    if params[:desk].blank?
      session[:desk] = @desks.first
    else
      if @desks.include? params[:desk]
        session[:desk] = params[:desk]
      else
        session[:desk] = @desks.first
        logger.warn "nao existe a mesa " + params[:desk] + " para o usuario " + params[:login]
      end
    end
    
  end

end
