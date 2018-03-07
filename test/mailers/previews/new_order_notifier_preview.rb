# Preview all emails at http://localhost:3000/rails/mailers/new_order
class NewOrderNotifierPreview < ActionMailer::Preview
  def send_new_order_email
    order = Order.last
    NewOrderNotifier.send_new_order_email(order)
  end
end
