class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details


  protected
  def authenticate
    redirect_to :controller => 'welcome' if session[:usr].blank?
    return true
  end

  def is_usuario_administrador
    return ( (Usuario.exists? session[:usr]) and (session[:usr].nivel == 1))
  end

 
end
