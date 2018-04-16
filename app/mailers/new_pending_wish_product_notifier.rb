class NewPendingWishProductNotifier < ApplicationMailer
  default :from => 'Alexandra@wala.com'

  def send_notification_to_admin(wish_product)
    @admins = Admin.all.pluck(:email)
    @wish_product = wish_product
    mail(:bcc => @admins,
    :subject => 'Wala - 心愿产品申请')
  end
end
