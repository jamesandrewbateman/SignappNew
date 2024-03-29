# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Added by Refinery CMS Pages extension
Refinery::Pages::Engine.load_seed

#Spree::Core::Engine.load_seed if defined?(Spree::Core)
#Spree::Auth::Engine.load_seed if defined?(Spree::Auth)

# Added by Refinery CMS Memberships engine
Refinery::Memberships::Engine.load_seed

# Added by Refinery CMS Inquiries engine
Refinery::Inquiries::Engine.load_seed

# Added by Refinery CMS Recipes extension
#Refinery::Mailchimp::Engine.load_seed
# Added by Refinery CMS Recipes extension
#Refinery::Mailchimp::Engine.load_seed


Spree::Core::Engine.load_seed if defined?(Spree::Core)
Spree::Auth::Engine.load_seed if defined?(Spree::Auth)
