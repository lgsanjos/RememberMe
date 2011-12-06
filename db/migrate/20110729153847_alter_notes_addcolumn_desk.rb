class AlterNotesAddcolumnDesk < ActiveRecord::Migration
  def self.up
    add_column :notes , :desk_id , :integer ,:references=>"desks" , :null=>:true
  end

  def self.down
    remove_column :notes, :desk_id
  end
end
