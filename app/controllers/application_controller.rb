class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_action :verify_authorized, unless: :devise_controller?
  rescue_from Exceptions::ResourceNotExists, with: :render_404_client_side_error

  def after_sign_in_path_for(resource)
    if resource.is_a?(Admin)
      '/product_support/admin'
    else
      stored_location_for(resource) || root_path
    end
  end

  def render_404_client_side_error(e)
    render json: e.message, status: :not_found
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:callback])
  end
end
