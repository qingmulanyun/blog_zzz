class OrdersController < ApplicationController
  include Exceptions

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

  def admin_index
    authorize Order
  end

  def buyer_orders
    @orders = Order.includes(:order_items).where(buyer_id: current_user.id)
    authorize @orders
    render 'buyer_orders.json'
  end

  def seller_orders
    shop = current_user.shop
    raise ResourceNotExists.new(ErrorCode::NOT_EXISTS_CODE, 'no shop') if shop.nil?
    @orders = Order.includes(:order_items).where(shop_id: shop.id)
    authorize @orders
    render 'seller_orders.json'
  end

  def cancel
    order = Order.find(cancel_params[:id])
    authorize order
    order.cancel
    @orders = Order.includes(:order_items).where(buyer_id: current_user.id)
    render 'buyer_orders.json'
  end

  def update
    order = Order.find(update_params[:id])
    authorize order
    order.update!(status: update_params[:status])
    @orders = Order.includes(:order_items).where(shop_id: current_user.shop.id)
    render 'seller_orders.json'
  end

  def update_delivery_track_number
    order = Order.find(update_track_number_params[:id])
    authorize order
    order.update!(delivery_track_number: update_track_number_params[:track_number])
    order.sent
    @orders = Order.includes(:order_items).where(shop_id: current_user.shop.id)
    render 'seller_orders.json'
  end

  def delivery_tracking
    order = Order.find( params[:order_id])
    authorize order
    @result = ::Delivery::Track_service.new(order.delivery_track_number, ENV['DELIVERY_SERVICE_HOST_URL']).query_delivery_order
    render 'delivery_tracking_info.json'
  end

  private

  def cart_items_params
    params.permit(cart_items_ids: [])
  end

  def cancel_params
    params.permit(:id)
  end

  def update_params
    params.permit(:id, :status)
  end

  def update_track_number_params
    params.permit(:id, :track_number)
  end
end
