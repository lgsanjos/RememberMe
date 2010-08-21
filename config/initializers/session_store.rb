# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_OfficeDesk_Brave_session',
  :secret      => '961859f6cff2b0ad8eefb43ffa76afec7595d16324186bb0794efcb39cf4aeb6d6be60b008d04d15e658291d873c1948596f4f3dd65037912ff0deafcc430376'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
