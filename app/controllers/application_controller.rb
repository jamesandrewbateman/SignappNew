class ApplicationController < ActionController::Base
  protect_from_forgery
  include Spree::BaseHelper
  include AccountHelper

  def after_sign_in_path_for(resource_or_scope)

    if resource_or_scope.class.name == "Refinery::Memberships::Member"
      "/members/welcome"
    elsif resource_or_scope.class.name == "Refinery::User"
      if resource_or_scope.has_role?(:superuser)
        "/admin"
      end
    end
  end
end
