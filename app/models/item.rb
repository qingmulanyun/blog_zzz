class Item < ActiveRecord::Base
  mount_uploader :image, ItemImageUploader

  belongs_to :shop

  validates_presence_of :original_price, :transport_cost, :price

  def cost
    (original_price || price || 10) + (transport_cost || 3.5) + 3
  end
end
