class Order < ActiveRecord::Base

  has_many :order_items, dependent: :destroy
  belongs_to :shop
  belongs_to :buyer, class_name: 'User'

  scope :new_created, -> { where status: 'new' }
  after_create :new_order_notification, :new_owned_order_notification

  state_machine :status, :initial => :new do
    after_transition all - [:sent]  => :sent do |order, transition|
      OrderSentNotifier.send_delivery_track_email(order).deliver
    end

    after_transition all - [:canceled]  => :canceled do |order, transition|
      OrderCanceledNotifier.send_order_canceled_email(order).deliver
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

  end

  def new_order_notification
    NewOrderNotifier.send_new_order_email(self).deliver
  end

  def new_owned_order_notification
    NewOwnedOrderNotifier.send_new_owned_order_email(self).deliver
  end
end
