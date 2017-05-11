class SessionsController < Devise::SessionsController
  layout 'sign_in'

  def new
    self.resource = resource_class.new(sign_in_params)
    store_location_for(resource, params[:redirect_to])
    super
  end
end