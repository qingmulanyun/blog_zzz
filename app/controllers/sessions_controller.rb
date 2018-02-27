class SessionsController < Devise::SessionsController
  layout 'sign_in'
  skip_after_action :verify_authorized

  def new
    self.resource = resource_class.new(sign_in_params)
    store_location_for(resource, params[:redirect_to])
    super
  end

  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message(:notice, :signed_in) if is_flashing_format?
    sign_in(resource_name, resource)
    respond_with(resource) do |format|
      format.html {
       redirect_to root_path
      }
      format.json { render json: {redirect_url: params[:user][:callback]}, status: 200 }
    end
  end
end