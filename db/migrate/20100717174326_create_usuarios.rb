class CreateUsuarios < ActiveRecord::Migration
  def self.up
    create_table :usuarios do |t|
      t.string  :nome, :limit => 30
      t.string :login, :limit => 30
      t.string :email, :email => true, :limit => 60
      t.string :senha, :limit => 20
      t.integer :nivel, :limit => 1
      t.timestamps
    end
  end

  def self.down
    drop_table :usuarios
  end
end
