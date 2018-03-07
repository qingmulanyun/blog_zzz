class NewOwnedOrderNotifier < ApplicationMailer
  default :from => 'Alexandra@wala.com'

  def send_new_owned_order_email(order)
    @user = order.shop.user
    @order = order
    mail(:to => @user.email,
    :subject => 'Wala - 新订单生成')
  end
end
