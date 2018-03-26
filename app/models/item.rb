class Item < ActiveRecord::Base
  mount_uploader :image, ItemImageUploader

  belongs_to :shop
  belongs_to :item_brand
  belongs_to :item_type
  has_many :order_items

  validates_presence_of :original_price, :transport_cost, :price, :sale_price, :weight

  scope :starred, -> { where starred: true }

  FOREX = 5.3.freeze

  def cost
    (cost * FOREX).round(2)
  end

  def formatted_price
    (price * FOREX).round(2)
  end

  def display_original_price
    (price * FOREX * (1 + formatted_commission)).round(2)
  end

  def formatted_commission
    commission/100
  end

  def formatted_transport_cost
    (transport_cost * FOREX).round(2)
  end

  def formatted_sale_price
    (sale_price * FOREX).round(2)
  end

  def formatted_original_price
    (original_price * FOREX).round(2)
  end

  def sales_number
    order_items&.sum(:quantity)
  end
end
