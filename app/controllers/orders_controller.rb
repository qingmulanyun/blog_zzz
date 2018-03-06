class OrdersController < ApplicationController

  def create
    cart_items_ids = cart_items_params[:cart_items_ids]
    cart_items = CartItem.includes(item:[:shop]).find(cart_items_ids)
    authorize cart_items
    order_hash = cart_items.group_by {|cart_item| cart_item.item.shop_id}
    order_hash.each { |shop_id, cart_items|
      Order.transaction do
        order = current_user.owned_orders.create!(shop_id: shop_id, status: 'new' )
        cart_items.each { |cart_item|
          order.order_items.create!(item_id: cart_item.item.id,
                                    quantity: cart_item.quantity,
                                    price: cart_item.item.price,
                                    transport_cost: cart_item.item.transport_cost
          )
          cart_item.destroy!
        }
      end
    }
  end

  def index
    authorize Order
  end

  def buyer_orders
    @orders = Order.includes(:order_items).where(buyer_id: current_user.id)
    authorize @orders
    render 'buyer_orders.json'
  end

  def cancel
    order = Order.find(cancel_params[:id])
    authorize order
    order.update!(status: 'canceled')
    @orders = Order.includes(:order_items).where(buyer_id: current_user.id)
    render 'buyer_orders.json'
  end

  private

  def cart_items_params
    params.permit(cart_items_ids: [])
  end

  def cancel_params
    params.permit(:id)
  end
end
