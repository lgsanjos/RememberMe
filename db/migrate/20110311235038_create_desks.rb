class CreateDesks < ActiveRecord::Migration
  def self.up
    create_table :desks do |t|
      t.string :nome, :limit => 20
      t.string :imgicon, :limit => 40
      t.string :imgbackground, :limit => 40
      t.string :private, :boolean
      t.string :shared, :boolean
      t.timestamps
    end
  end

  def self.down
    drop_table :desks
  end
end
