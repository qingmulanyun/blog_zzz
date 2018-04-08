class Order < ActiveRecord::Base

  has_many :order_items, dependent: :destroy
  belongs_to :shop
  belongs_to :buyer, class_name: 'User'
  belongs_to :address

  scope :new_created, -> { where status: 'new' }
  scope :delivered_orders, -> { where status: 'delivered' }
  after_create :new_order_notification, :new_owned_order_notification

  state_machine :status, :initial => :new do
    after_transition all - [:sent]  => :sent do |order, transition|
      OrderSentNotifier.send_delivery_track_email(order).deliver_later
    end

    after_transition all - [:canceled]  => :canceled do |order, transition|
      OrderCanceledNotifier.send_order_canceled_email(order).deliver_later
    end

    after_transition all - [:delivered]  => :delivered do |order, transition|
      order.update_attributes!(sold_price: order.order_price)
      OrderDeliveredNotifier.send_delivered_confirmation_email(order).deliver_later
    end

    event :buying do
      transition :new => :buying
    end

    event :sent do
      transition all - [:sent] => :sent
    end

    event :cancel do
      transition all - [:canceled] => :canceled
    end

    event :delivered do
      transition all - [:delivered] => :delivered
    end

  end

  def new_order_notification
    NewOrderNotifier.send_new_order_email(self).deliver_later
  end

  def new_owned_order_notification
    NewOwnedOrderNotifier.send_new_owned_order_email(self).deliver_later
  end

  def order_price
    order_items.reduce(0){|sum, item| sum + (item.formatted_price + item.formatted_transport_cost) * item.quantity}
  end
end
