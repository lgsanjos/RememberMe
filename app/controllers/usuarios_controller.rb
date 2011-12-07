class UsuariosController < ApplicationController
  
  def login
    usr = Usuario.new(params[:login])
    
    if (usr.authenticate)
      session[:usr] = usr
      redirect_to :controller => usr.login
    else
      flash[:error] = 'Incorrect username or password, please try again.'
      redirect_to :controller => "office", :action => "welcome"
    end
  end
  
  def logout
    reset_session
    flash[:message] = 'Sessão limpa' 
    redirect_to :controller => "office", :action => "welcome" 
  end  


  def create

    if request.post?
      usr = Usuario.new(params[:usuario])
      usr.nivel = 0
      
      if usr.save
        session[:usr] = usr
        redirect_to :controller => usr.login
      else
        redirect_to :controller => "office", :action => "welcome"
      end
   end   
  end
  

  def esqueceu_senha
    @usuario = Usuario.find(:first, :conditions => {:login => params[:esqueceu][:login], :email => params[:esqueceu][:email]})

    unless @usuario.blank?
      begin
        # TODO: format the content as HTML and create a new password
        Emailer::deliver_mail(params[:esqueceu][:email], "Recupera&ccedil;&atilde;o de senha.", "We received the request to create a new password.")
        logger.info "Enviou ?"
        flash[:notice] = "The email has been sent to #{params[:esqueceu][:email]} succesfully. "
      rescue
        flash[:notice] = "An error occurred while we were sending the email, please confirm your data and send it again.  #{$!}"
      ensure
      end
    else
      flash[:notice] = "Sorry but there is no #{params[:esqueceu][:login]} with the email #{params[:esqueceu][:email]} registered in our system."
    end

    redirect_to :controller => :office, :action => :welcome
  end


end
