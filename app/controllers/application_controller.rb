# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.
class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password

  protected
  def authenticate
    redirect_to :controller => 'office', :action => 'welcome' unless Usuario.exists? session[:usr]
    return true
  end

  def is_usuario_administrador
    return ( (Usuario.exists? session[:usr]) and (session[:usr].nivel == 1))
  end

 
end
