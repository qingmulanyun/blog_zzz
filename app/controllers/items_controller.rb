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

  def create_seller_item
    current_user.shop.items.create!(new_item_params)
  end

  private

  def new_item_params
    params.permit(
              :name, :cost, :price, :description, :image
    )
  end
end
