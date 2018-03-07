class NewOrderNotifier < ApplicationMailer
  default :from => 'Alexandra@wala.com'

  def send_new_order_email(order)
    @user = order.buyer
    @order = order
    mail(:to => @user.email,
    :subject => '新订单生成')
  end
end
