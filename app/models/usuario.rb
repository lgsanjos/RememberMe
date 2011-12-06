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
      unless temp.nil? or temp.blank?
        self.email = temp.email
        self.nivel = temp.nivel
        self.nome = temp.nome
        self.id = temp.id
        return true
      end
      
        return false
    end
   
end
