class OrdersController < ApplicationController

  def create
    authorize Order
    cart_items_ids = params[:cart_items_ids]
    cart_items = CartItem.find(cart_items_ids).includes(item:[:shop])
    order_hash = cart_items.group_by {|cart_item| cart_item.item.shop_id}
    order_hash.each { |shop_id, cart_items|
      Order.transaction do
        order = current_user.owned_orders.create!(shop_id: shop_id, statue: 'new' )
        cart_items.each { |cart_item|
          order.order_items.create!(item_id: cart_item.item.id, quantity: cart_item.quantity)
          cart_item.destroy!
        }
      end
    }
  end

  def index
    authorize Order
  end
end
