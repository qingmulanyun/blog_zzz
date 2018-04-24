class WishProduct < ApplicationRecord
  mount_uploader :image, WishProductImageUploader

  belongs_to :user
  has_many :items
  belongs_to :item_brand
  belongs_to :item_type

  scope :status_at, lambda { |status| where(status: status )}

  rails_admin do
    edit do
      field :name
      field :image
      field :user
      field :item_brand
      field :item_type
      field :description
      field :status, :state
    end
  end

  after_create :publish_notification_to_admin

  state_machine :status, :initial => :pending do
    after_transition all - [:approved]  => :approved do |wish_product, transition|
      publish_approved_notification_to_sellers
      publish_approved_notification_to_buyer
    end

    event :approve do
      transition pending: :approved
    end

    event :cancel do
      transition all - [:canceled] => :canceled
    end

    event :come_true do
      transition any => :come_true
    end

  end

  def publish_notification_to_admin
    NewPendingWishProductNotifier.send_notification_to_admin(self).deliver_later
  end

  def publish_approved_notification_to_sellers
    ApprovedWishProductNotifier.send_notification_to_sellers(self).deliver_later
  end

  def publish_approved_notification_to_buyer
    ApprovedWishProductNotifier.send_notification_to_buyer(self).deliver_later
  end
end
