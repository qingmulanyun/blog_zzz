# Preview all emails at http://localhost:3000/rails/mailers/new_order
class OrderCanceledNotifierPreview < ActionMailer::Preview
  def send_order_canceled_email
    order = Order.last
    OrderCanceledNotifier.send_order_canceled_email(order)
  end
end
