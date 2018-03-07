class OrderCanceledNotifier < ApplicationMailer
  default :from => 'Alexandra@wala.com'

  def send_order_canceled_email(order)
    @user = order.buyer
    @order = order
    mail(:to => @user.email,
    :subject => '取消订单')
  end
end
