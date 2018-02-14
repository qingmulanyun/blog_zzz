class ItemsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index_public]

  def index_public
    Item.all
  end

  def seller_items
    @items = current_user.shop.present? ?  current_user.shop.items.order(updated_at: :desc) : nil
    render 'seller_items.json'
  end

  def new

  end

end
