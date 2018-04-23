class ApprovedWishProductNotifier < ApplicationMailer
  default :from => 'Alexandra@wala.com'

  def send_notification_to_sellers(wish_product)
    @sellers = User.sellers.pluck(:email).reject{ |email| email == wish_product.user.email }
    @wish_product = wish_product
    mail(:bcc => @sellers,
    :subject => 'Wala - 心愿订单')
  end

  def send_notification_to_buyer(wish_product)
    @user = wish_product.user
    @wish_product = wish_product
    mail(:to => @user.email,
         :subject => 'Wala - 心愿产品申请通过审核')
  end
end
