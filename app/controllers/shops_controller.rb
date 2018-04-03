class ShopsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index_public]

  def index_public
    Item.all
  end

  def index
    current_user.shop.items.order(updated_at: :desc)   if current_user.shop.present?
  end

  def new
    authorize Shop
  end

  def shop_report
    authorize Shop
    @shop = current_user.shop
  end

  def my_shop
    myshop = current_user.shop
    authorize myshop
    render status: 200, json:{ myshop: myshop }
  end

  def create
    authorize Shop
    shop = current_user.create_shop(new_shop_params)
    redirect_to user_shop_path(current_user, shop)
  end

  def sale_report
    authorize Shop
    current_user.shop.admin_orders.delivered_orders.group('created_at').sum(:sold_price)
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
