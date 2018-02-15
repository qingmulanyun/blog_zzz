class ShopsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index_public]

  def index_public
    Item.all
  end

  def index
    current_user.shop.items.order(updated_at: :desc)   if current_user.shop.present?
  end

  def new

  end

  def show
    @shop = current_user.shop
  end

  def my_shop
    myshop = current_user.shop
    render status: 200, json:{ myshop: myshop }
  end

  def create
    current_user.create_shop(new_shop_params) unless current_user.shop.present?
    redirect_to user_path(current_user)
  end

  private

  def new_shop_params
    params
        .require(:shop)
        .permit(
            :name, :description
        )
  end
end
