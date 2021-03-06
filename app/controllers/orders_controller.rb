class OrdersController < ApplicationController
  include Exceptions

  def create
    cart_items_ids = create_order_params[:cart_items_ids]
    cart_items = CartItem.includes(item:[:shop]).find(cart_items_ids)
    authorize Order
    order_hash = cart_items.group_by {|cart_item| cart_item.item.shop_id}
    order_hash.each { |shop_id, cart_items|
      Order.transaction do
        order = current_user.owned_orders.create!(shop_id: shop_id, status: 'new', address_id: create_order_params[:address_id] )
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
    @orders = Order.includes(:order_items).where(buyer_id: current_user.id).order(created_at: :desc)
    authorize @orders
    render 'buyer_orders.json'
  end

  def seller_orders
    shop = current_user.shop
    raise ResourceNotExists.new(ErrorCode::NOT_EXISTS_CODE, 'no shop') if shop.nil?
    @orders = Order.includes(:order_items).where(shop_id: shop.id).order(created_at: :desc)
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
    order.update!(delivery_track_number: update_track_number_params[:track_number], carrier_id: update_track_number_params[:carrier_id])
    order.sent
    @orders = Order.includes(:order_items).where(shop_id: current_user.shop.id)
    render 'seller_orders.json'
  end

  def delivery_tracking
    order = Order.find( params[:order_id])
    authorize order
    delivery_track_numbers = order.delivery_track_number.split(',').map(&:strip)
    carrier = Carrier.find_by(id: order.carrier_id)
    carrier_service = carrier.present? ? carrier.internal_symbol.camelize : 'AuExpress'
    @result = "::Delivery::#{carrier_service}".constantize.new(delivery_track_numbers).query_delivery_order
    render 'delivery_tracking_info.json'
  end

  # buyer only
  def confirm_delivered
    order = Order.find( params[:id])
    authorize order
    order.delivered
    @orders = Order.includes(:order_items).where(buyer_id: current_user.id).order(created_at: :desc)
    render 'buyer_orders.json'
  end

  private

  def create_order_params
    params.permit(:address_id, cart_items_ids: [])
  end

  def cancel_params
    params.permit(:id)
  end

  def update_params
    params.permit(:id, :status)
  end

  def update_track_number_params
    params.permit(:id, :track_number, :carrier_id)
  end
end
