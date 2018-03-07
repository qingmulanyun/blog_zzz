# Preview all emails at http://localhost:3000/rails/mailers/new_order
class NewOwnedOrderNotifierPreview < ActionMailer::Preview
  def send_new_owned_order_email
    order = Order.last
    NewOwnedOrderNotifier.send_new_owned_order_email(order)
  end
end
