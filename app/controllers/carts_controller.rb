class CartsController < ApplicationController
  before_action :current_user_cart

  def index
    authorize Cart
  end

  def add_item
    authorize Cart
    item = Item.find(params[:item_id])
    cart_item = CartItem.find_by(item_id: item.id)
    if cart_item.present?
      original_quantity = cart_item.quantity
      cart_item.update_attributes!(quantity: original_quantity + params[:item_quantity].to_i)
    else
      @cart.cart_items.create!(cart: @cart, item_id: item.id, quantity: params[:item_quantity])
    end
    render json: {item: item, added_quantity: params[:item_quantity]}
  end

  def remove_item
    authorize Cart
  end

  def show_items
    authorize Cart
    @cart_items = @cart.cart_items.includes(item:[:shop]).order(created_at: :asc)
    render 'cart_items.json'
  end

  def destroy_item
    cart_items = @cart.cart_items.find(params[:cart_item_id])
    authorize cart_items
    cart_items.each(&:destroy)
    @cart_items = @cart.cart_items.includes(item:[:shop]).order(created_at: :asc)
    render 'cart_items.json'
  end

  def update_item
    cart_item = @cart.cart_items.find(params[:id])
    authorize cart_item
    cart_item.update_attributes!(quantity: params[:quantity])
    @cart_items = @cart.cart_items.includes(item:[:shop]).order(created_at: :asc)
    render 'cart_items.json'
  end

  private
  def current_user_cart
    @cart = current_user.cart || current_user.create_cart
  end
end
