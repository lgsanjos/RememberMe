class OfficeController < ApplicationController
  
  before_filter :authenticate, :except => [:welcome]
  
  def redireciona_usuario_para_sua_area
    unless params[:login].casecmp(session[:usr].login) == 0
      redirect_to :controller => session[:usr].login
    end
  end
   
  def index
      
      redireciona_usuario_para_sua_area
      seleciona_desks
     
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

    if @desks.blank?
      nova_desk = Desk.new
      nova_desk.nome = 'home'
      nova_desk.private = true 
      nova_desk.shared = false
      nova_desk.usuario = session[:usr]
      nova_desk.ordem = 0
      nova_desk.save
            
      @desks = [nova_desk]
    end

    if params[:desk].blank?
      session[:desk] = @desks.min_by { | desk |
        desk.ordem
      }
    else
      desk_indicada = @desks.detect { | desk | desk.nome.casecmp(params[:desk]) == 0 }
      unless desk_indicada.blank?
        session[:desk] = desk_indicada
      else
        redirect_to :controller => session[:usr].login, :action => (@desks.min_by { | desk | desk.ordem }).nome
        
      end
    end    
  end

end
