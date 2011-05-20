class OfficeController < ApplicationController
  before_filter :authenticate, :except => [:welcome]
    
  def index
      @note = Note.find(:all, :conditions => {'trashed' => false, 'user_id' => session[:usr].id} )     
      @apptitle = "#{session[:usr].login}@desk - Office Desk"
  end

  def welcome
     @apptitle = "Office Desk";
  end

end
