class Usuario < ActiveRecord::Base
    validates_presence_of :login, :senha, :email
    validates_uniqueness_of :login, :email 
    validates_confirmation_of :senha, :on => :create 
    validates_length_of :senha, :within => 4..40

    has_many :desk

    # If a user matching the credentials is found, returns the User object.
    # If no matching user is found, returns nil.

    public
    def authenticate
      temp =  Usuario.find(:first, :conditions => (['login=? AND senha=?', self.login, self.senha]))
      not temp.blank?
    end
   
end
