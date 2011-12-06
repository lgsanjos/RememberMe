ENV["RAILS_ENV"] = "test"
require File.expand_path(File.dirname(__FILE__) + "/../config/environment")
require 'test_help'

#Dados para rodar o watir
BROWSER_NAME = :firefox
SERVER_URL = 'http://localhost'
SERVER_PORT = '3000'

class ActiveSupport::TestCase

  self.use_transactional_fixtures = true
  self.use_instantiated_fixtures  = false

  fixtures :all 
 
end