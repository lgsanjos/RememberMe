# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110729223533) do

  create_table "desks", :force => true do |t|
    t.string   "nome",          :limit => 20
    t.string   "imgicon",       :limit => 40
    t.string   "imgbackground", :limit => 40
    t.string   "private"
    t.string   "boolean"
    t.string   "shared"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "usuario_id"
    t.integer  "ordem"
  end

  create_table "notes", :force => true do |t|
    t.string   "UUID",       :limit => 20
    t.string   "conteudo",   :limit => 500
    t.integer  "categoria",                 :default => 0
    t.integer  "prioridade"
    t.string   "posX",       :limit => 4
    t.string   "posY",       :limit => 4
    t.string   "width",      :limit => 4
    t.string   "height",     :limit => 4
    t.boolean  "trashed",                   :default => false
    t.boolean  "shared",                    :default => false
    t.string   "state",      :limit => 1
    t.string   "titulo",     :limit => 150
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "desk_id"
  end

  create_table "usuarios", :force => true do |t|
    t.string   "nome",       :limit => 30
    t.string   "login",      :limit => 30
    t.string   "email",      :limit => 60
    t.string   "senha",      :limit => 20
    t.integer  "nivel",      :limit => 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
