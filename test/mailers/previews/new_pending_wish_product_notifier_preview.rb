# Preview all emails at http://localhost:3000/rails/mailers/user_notifier
class NewPendingWishProductNotifierPreview < ActionMailer::Preview
  def send_notification_to_admin
    wish_product = WishProduct.last
    NewPendingWishProductNotifier.send_notification_to_admin(wish_product)
  end
end
