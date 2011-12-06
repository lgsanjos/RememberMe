class UsuariosController < ApplicationController
  
  def index
    @usuarios = Usuario.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @usuarios }
    end
  end


  def login
    #find(:first, :conditions => (['login=? AND senha=?', params[:login]["login"], params[:login]["senha"]]))
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


  def show
    @usuario = Usuario.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @usuario }
    end
  end

  def new
    @usuario = Usuario.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @usuario }
    end
  end

  # GET /usuarios/1/edit
  def edit
    @usuario = Usuario.find(params[:id])
  end

  # POST /usuarios
  # POST /usuarios.xml
  def create

    if request.post?
      usr = Usuario.new(params[:usuario])
      usr.nivel = 0
      
      if usr.save
        session[:usr] = usr
        redirect_to :controller => 'office', :action => 'index'
      else
        redirect_to :controller => "office", :action => "welcome"
      end
   end
   
  end

  # PUT /usuarios/1
    def update
    @usuario = Usuario.find(params[:id])

    respond_to do |format|
      if @usuario.update_attributes(params[:usuario])
        format.html { redirect_to(@usuario, :notice => 'Usuario was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @usuario.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /usuarios/1
  # DELETE /usuarios/1.xml
  def destroy
    @usuario = Usuario.find(params[:id])
    @usuario.destroy

    respond_to do |format|
      format.html { redirect_to(usuarios_url) }
      format.xml  { head :ok }
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

  def esqueceu_conta

  end

  def nova_conta

  end

end
