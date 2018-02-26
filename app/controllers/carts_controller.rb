class CartsController < ApplicationController

  def add_item
    cart = current_user.cart || current_user.create_cart
  end

  def remove_item

  end
end
