class Desk < ActiveRecord::Base
    belongs_to :usuario
    has_many :note
end
