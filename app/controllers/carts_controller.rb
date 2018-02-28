class CartsController < ApplicationController

  def add_item
    authorize Cart
    cart = current_user.cart || current_user.create_cart
    item = Item.find(params[:item_id])
    cart_item = CartItem.find_by(item_id: item.id)
    if cart_item.present?
      original_quantity = cart_item.quantity
      cart_item.update_attributes!(quantity: original_quantity + params[:item_quantity].to_i)
    else
      cart.cart_items.create!(cart: cart, item_id: item.id, quantity: params[:item_quantity])
    end
    render json: {item: item, added_quantity: params[:item_quantity]}
  end

  def remove_item
    authorize Cart
  end
end
