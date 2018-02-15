class Item < ActiveRecord::Base
  mount_uploader :image, ItemImageUploader

  belongs_to :shop
end
