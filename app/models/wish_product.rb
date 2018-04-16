class WishProduct < ApplicationRecord
  mount_uploader :image, WishProductImageUploader

  belongs_to :user
  has_many :items
  belongs_to :item_brand
  belongs_to :item_type

  after_create :publish_notification_to_shops

  state_machine :status, :initial => :pending do
    # after_transition all - [:approved]  => :approved do |wish_product, transition|
    #
    # end

    event :cancel do
      transition all - [:canceled] => :canceled
    end

    event :come_true do
      transition any => :come_true
    end

  end

  def publish_notification_to_shops
    NewPendingWishProductNotifier.send_notification_to_admin(self).deliver_later
  end
end
