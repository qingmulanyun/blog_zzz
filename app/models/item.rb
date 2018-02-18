class Item < ActiveRecord::Base
  mount_uploader :image, ItemImageUploader

  belongs_to :shop

  validates_presence_of :original_price, :transport_cost, :price, :sale_price, :weight

  FOREX = 5.3.freeze

  def cost
    (original_price || price || 10) + (transport_cost || 3.5) + 3
  end

  def formatted_price
    price * FOREX
  end

  def display_original_price
    price * FOREX * (1 + formatted_commission)
  end

  def formatted_commission
    commission / 100
  end

  def formatted_transport_cost
    transport_cost * FOREX
  end

  def formatted_sale_price
    sale_price * FOREX
  end

  def formatted_original_price
    original_price * FOREX
  end
end
