# encoding: utf-8
Refinery::Core.configure do |config|
  # When true will rescue all not found errors and display a friendly error page
  config.rescue_not_found = Rails.env.production?

  # When true this will force SSL redirection in all Refinery backend controllers.
  # config.force_ssl = false

  # When true will use Amazon's Simple Storage Service instead of
  # the default file system for storing resources and images
  config.s3_backend = !(ENV['S3_KEY'].nil? || ENV['S3_SECRET'].nil?)

  # Whenever Refinery caches anything and can set a cache key, it will add
  # a prefix to the cache key containing the string you set here.
  # config.base_cache_key = :refinery

  # Site name
   config.site_name = "Signapp"

  # This activates Google Analytics tracking within your website. If this
  # config is left blank or set to UA-xxxxxx-x then no remote calls to
  # Google Analytics are made.
  # config.google_analytics_page_code = "UA-54988510-1"

  # Enable/disable authenticity token on frontend
  # config.authenticity_token_on_frontend = true

  # Hide/show child pages in menu
  # config.menu_hide_children = false

  # CSS class selectors for menu helper
  # config.menu_css = {:selected=>"selected", :first=>"first", :last=>"last"}

  # Should set this if concerned about DOS attacks. See
  # http://markevans.github.com/dragonfly/file.Configuration.html#Configuration
  # config.dragonfly_secret = "2f45fc2ba276c800010a92cd670b34d0d53c90e8ff8e8cb9"

  # Show/hide IE6 upgrade message in the backend
  # config.ie6_upgrade_message_enabled = true

  # Show/hide browser update message in the backend
  # config.show_internet_explorer_upgrade_message = false

  # Add extra tags to the wymeditor whitelist e.g. = {'tag' => {'attributes' => {'1' => 'href'}}} or just {'tag' => {}}
  # config.wymeditor_whitelist_tags = {}

  # Register extra javascript for backend
  # config.register_javascript "prototype-rails"

  # Register extra stylesheet for backend (optional options)
  # config.register_stylesheet "custom", :media => 'screen'
end
