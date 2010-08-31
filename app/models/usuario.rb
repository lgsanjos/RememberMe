class Usuario < ActiveRecord::Base
    validates_presence_of :login, :senha, :email
    validates_uniqueness_of :login, :email 
    validates_confirmation_of :senha, :on => :create 
    validates_length_of :senha, :within => 5..40

    # If a user matching the credentials is found, returns the User object.
    # If no matching user is found, returns nil.
    def self.authenticate(user_info)
      find(:first, :conditions => (['login=? AND senha=?', user_info[:login], user_info[:senha]])) 
    end  
end
