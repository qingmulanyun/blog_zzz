# Preview all emails at http://localhost:3000/rails/mailers/new_order
class OrderDeliveredConfirmationNotifierPreview < ActionMailer::Preview
  def send_delivered_confirmation_email
    order = Order.last
    OrderDeliveredNotifier.send_delivered_confirmation_email(order)
  end
end
