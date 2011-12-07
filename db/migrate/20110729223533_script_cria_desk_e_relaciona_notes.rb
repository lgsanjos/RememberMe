class ScriptCriaDeskERelacionaNotes < ActiveRecord::Migration
  def self.up
    Usuario.all.each do | user |
      if user.desk.empty?
        say "Criando desk para usuario " + user.nome

        desk = Desk.new
        desk.nome = "home"
        desk.imgicon = "home"
        desk.imgbackground = "wood_default"
        desk.private = true
        desk.shared = false
        desk.usuario_id = user.id
        desk.ordem = 0
        desk.save        
        say "desk criada"

        notes = Note.find(:all, :conditions => {:user_id => user.id})
        say "Há " + notes.count.to_s + " notes do usuario para associar a desk"

        notes.each do | note |
            say "Associando Note id=" + note.id.to_s + " com a desk id=" + desk.id.to_s
            note.desk = desk
            note.save
        end
      end

    end    
  end

  def self.down
  end
end
