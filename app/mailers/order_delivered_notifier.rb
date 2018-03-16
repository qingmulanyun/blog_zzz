class OrderDeliveredNotifier < ApplicationMailer
  default :from => 'Alexandra@wala.com'

  def send_delivered_confirmation_email(order)
    @user = order.buyer
    @order = order
    mail(:to => @user.email,
    :subject => 'Wala - 货物已送达')
  end
end
