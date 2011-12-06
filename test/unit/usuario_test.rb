require 'rubygems'
require 'test/unit'
require 'watir-webdriver'

class UsuarioTest < ActiveSupport::TestCase
  
  def setup
    @browser ||= Watir::Browser.new BROWSER_NAME
    @browser.goto SERVER_URL + ":" + SERVER_PORT
    @browser.div(:id => "login").wait_until_present
  end

  def teardown
    @browser.close
  end

  def test_login_basico
     fixture :usuarios
    
     @browser.text_field(:id => "login_login").set "teste"
     @browser.text_field(:id => "login_senha").set "123teste"
     @browser.button(:name => 'commit').click
     @browser.div(:id => "odTableTop").wait_until_present

     assert @browser.title == "teste@desk - Office Desk"
     assert @browser.url == SERVER_URL + ":" + SERVER_PORT + "/teste"
  end

  def test_login_e_logout
    fixture :usuarios
     
    @browser.text_field(:id => "login_login").set "teste"
    @browser.text_field(:id => "login_senha").set "123teste"
    @browser.button(:name => 'commit').click
    @browser.div(:id => "odTableTop").wait_until_present

    @browser.a(:id => "signOut").click

    assert @browser.title == "Office Desk"
    assert @browser.url == SERVER_URL + ":" + SERVER_PORT
  end

  def test_cria_novo_usuario
    @browser.a(:id => 'lkNovaConta').click

    #browser.text_field(:id => "usuario_nome", :index  => 1).wait_until_present
    
    puts "aguardando"
    @browser.text_field(:id => "piroPanel", :index  => 0).wait_until_present
    puts "pronto. setando texto"
    @browser.text_field(:id => "usuario_nome", :index  => 2).set("teste")
    puts "fail!"
    @browser.text_field(:id => "usuario_login").set("teste")
    @browser.text_field(:id => "usuario_email").set("teste@gmail.com")
    @browser.text_field(:id => "usuario_login").set("testelogin")
    @browser.text_field(:id => "usuario_senha").set("teste123")
    @browser.text_field(:id => "_resenha").set("teste123")
    puts "até aki foi"
    @browser.button(:name => 'commit').click

    @browser.div(:id => "odTableTop").wait_until_present

    assert @browser.title == "SAnjos@desk - Office Desk"
    assert @browser.url == SERVER_URL + ":" + SERVER_PORT + "/sanjos"
  end
  
end
