class CreateNotes < ActiveRecord::Migration

  def self.up
    create_table :notes do |t|
      t.string :UUID, :limit => 20, :unique => true
      t.string :conteudo, :limit => 500;
      t.integer :categoria, :default => 0
      t.integer :prioridade, :desult => 0
      t.string :posX, :limit => 4
      t.string :posY, :limit => 4
      t.string :width, :limit => 4
      t.string :height, :limit => 4
      t.boolean :trashed, :default => false

      t.boolean :shared, :default => false
      t.string :state, :limit => 1
      t.string :titulo, :limit => 150

      t.integer :user_id
      t.timestamps
    end
  end

  def self.down
    drop_table :notes
  end
end
