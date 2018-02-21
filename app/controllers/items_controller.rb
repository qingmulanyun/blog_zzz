class ItemsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:all_items, :show, :show_item]

  def all_items
    @all_items = Item.includes(shop: [:user]).all
    authorize @all_items
    render 'all_items.json'
  end

  def seller_items
    @items = current_user.shop.present? ?  current_user.shop.items.order(updated_at: :desc) : nil
    authorize Item
    render 'seller_items.json'
  end

  def new
  end

  def show
    authorize Item
  end

  def show_item
    authorize Item
    @item = Item.find(params[:id])
    render 'show_item.json'
  end

  def destroy_items
    items = Item.where(id: params[:ids])
    authorize items
    items.destroy_all
  end

  def create_seller_item
    new_item = current_user.shop.items.create!(new_item_params.merge(status: 'active'))
    authorize new_item
  end

  private

  def new_item_params
    params.permit(
              :name, :original_price, :transport_cost, :price, :description, :image, :sale_price, :commission, :weight
    )
  end
end
