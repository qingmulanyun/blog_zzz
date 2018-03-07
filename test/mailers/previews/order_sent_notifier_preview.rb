# Preview all emails at http://localhost:3000/rails/mailers/new_order
class OrderSentNotifierPreview < ActionMailer::Preview
  def send_delivery_track_email
    order = Order.last
    OrderSentNotifier.send_delivery_track_email(order)
  end
end
