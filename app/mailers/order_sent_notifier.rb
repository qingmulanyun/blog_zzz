class OrderSentNotifier < ApplicationMailer
  default :from => 'Alexandra@wala.com'

  def send_delivery_track_email(order)
    @user = order.buyer
    @order = order
    mail(:to => @user.email,
    :subject => '已发货')
  end
end
