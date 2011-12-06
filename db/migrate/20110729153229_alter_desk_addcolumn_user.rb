class AlterDeskAddcolumnUser < ActiveRecord::Migration
  def self.up
    add_column :desks , :usuario_id , :integer ,:references=>"usuarios" , :null=>:true
    add_column :desks , :ordem , :integer
  end

  def self.down
    remove_column :desks, :usuario_id
    remove_column :desks, :ordem
  end
end
