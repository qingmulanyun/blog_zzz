class UsersController < ApplicationController

  def show
  end

  def own_shop
    @shop = current_user.shop
    authorize @shop
    render 'shops/show'
  end
end
