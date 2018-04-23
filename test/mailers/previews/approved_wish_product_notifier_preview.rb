# Preview all emails at http://localhost:3000/rails/mailers/user_notifier
class ApprovedWishProductNotifierPreview < ActionMailer::Preview
  def send_notification_to_sellers
    wish_product = WishProduct.last
    ApprovedWishProductNotifier.send_notification_to_sellers(wish_product)
  end

  def send_notification_to_buyer
    wish_product = WishProduct.last
    ApprovedWishProductNotifier.send_notification_to_buyer(wish_product)
  end
end
