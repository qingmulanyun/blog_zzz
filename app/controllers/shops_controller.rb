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
    orders = current_user.shop.admin_orders.delivered_orders.group_by_month(:created_at).sum('CAST(sold_price_cents AS FLOAT)/100')
    base_hash = base_month_hash(orders.keys[0], Date.current)
    @result = base_hash.merge!(orders)
    render 'sale_report.json'
  end

  def approved_wish_products_index
    shop = current_user.shop
    authorize shop
  end

  def approved_wish_products_list
    shop = current_user.shop
    authorize shop
    @wish_products = WishProduct.status_at('approved')
    render 'wish_products.json'
  end

  private

  def new_shop_params
    params
        .require(:shop)
        .permit(
            :name, :description
        )
  end

  def base_month_hash(start_month, end_month)
    temp_hash = {}
    if start_month.present?
      while start_month <= end_month  do
        temp_hash[start_month] = 0
        start_month += 1.month
      end
    end
    temp_hash
  end
end
