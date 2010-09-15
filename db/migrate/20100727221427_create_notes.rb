class CreateNotes < ActiveRecord::Migration

  def self.up
    create_table :notes do |t|
      t.string :UUID, :size => 20, :unique => true
      t.string :conteudo, :size => 500;
      t.integer :categoria, :default => 0
      t.integer :prioridade, :desult => 0
      t.string :posX, :size => 4
      t.string :posY, :size => 4
      t.string :width, :size => 4
      t.string :height, :size => 4
      t.boolean :trashed, :default => false

      t.boolean :shared, :default => false
      t.string :state, :size => 1
      t.string :titulo, :size => 150

      t.integer :user_id
      t.timestamps
    end
  end

  def self.down
    drop_table :notes
  end
end
