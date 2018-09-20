class CarriersController < ApplicationController
  
  def index
    @carriers = Carrier.all
    authorize @carriers
    render json: @carriers, status: 200
  end
end
